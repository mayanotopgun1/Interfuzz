# InterFuzz 图绘制与数据规范（自实现指南）

本文档说明如何根据 InterFuzz 的数据结构自行实现图绘制，包括节点/边类型、主题适配、连线端口绑定与示例数据。

## 1. 概念与目标

- 统一抽象：以异构程序图（HPG）表达类间结构。
- 四类节点（𝒯）：Class / Interface / Method / Field。
- 五类边（ℰ）：Inheritance / Interface-Impl / Nesting / Generic-Bounds / Reference。
- 主题适配：支持浅色与深色主题的颜色可读性与对比度。
- 可交互：节点可拖动，边随之重绘；可缩放平移。

## 2. JSON 数据结构

顶层结构：

```jsonc
{
  "meta": {
    "title": "可选标题",
    "layout": {
      "mode": "grid",                // 暂只使用 grid
      "colGap": 170,                  // 列间距
      "rowGap": 160,                  // 行间距
      "labelDistanceFromSource": 80   // 边标签沿路径的距离（像素）
    },
    "nodeDefaults": { "width": 180, "rowHeight": 30, "padding": 8 }
  },
  "nodes": [ /* 见下 */ ],
  "edges": [ /* 见下 */ ]
}
```

### 2.1 节点 nodes[]

```jsonc
{
  "id": "c1",
  "layer": 1,          // 列位置（越大越靠右）
  "order": 0,          // 行序（越大越靠下）
  "kind": "class",     // 可选；若缺省则以 rows[0].type 推断
  "rows": [
    { "type": "class", "text": "Class C1" },
    { "type": "method", "text": "void foo()" },
    { "type": "field",  "text": "int count" }
  ]
}
```

说明：
- 四类节点类型：`class | interface | method | field`。
- 常见做法：class/interface 节点用第一行标识类型，后续列出方法/字段。
- 也可把方法/字段做成独立节点，此时 `rows` 通常只有一行（其自身类型）。

### 2.2 边 edges[]

```jsonc
{
  "id": "e_c1_i1_impl",
  "source": "c1",
  "target": "i1",
  "kind": "interface-impl",        // 推荐；缺省则回退 style/label 控制
  "style": { "line": "dashed", "marker": "arrow" }, // 可选，覆盖默认
  "label": "Interface Implement",  // 可选，支持换行 "A\nB"
  "attach": {
    "sourceRow": 1,                 // 1-based 绝对行号（优先）
    "targetRow": 1,
    "sourceMethodIndex": 0,         // 在方法行中的第几个（0-based）
    "targetMethodIndex": 0,
    "sourceMatch": "foo",          // 按行文案模糊匹配（首个命中）
    "targetMatch": "bar"
  },
  "extendDistance": 80,              // 可选：水平延伸长度
  "labelDistanceFromSource": 80,     // 可选：标签沿路径距离
  "labelDy": 0,                      // 可选：标签垂直偏移
  "targetSide": "east"              // 可选：目标侧（east|west|north|south）
}
```

#### 2.2.1 极简边写法（推荐用于演示/手写数据）

为降低心智负担，渲染器已支持在边对象顶层直接写行定位字段（无需 `attach` 包裹）：

```json
{
  "id": "e_c0_c1_call",
  "kind": "reference",
  "source": "c0",
  "target": "c1",
  "sourceRow": 2,      // 1-based
  "targetRow": 2,      // 1-based
  "label": "Reference\nMethod Invocation"
}
```

说明：
- `sourceRow` / `targetRow`（1-based）可直接放在顶层；与 `attach.sourceRow/targetRow` 等效，若两者同时出现，以顶层为准。
- 仍可按需保留 `style` 字段覆盖默认线型/箭头；未提供 `kind` 时用 `style` 作为回退。

## 3. 节点样式（主题感知）

为保证在浅/深色主题下都可读，推荐如下主色（可按需调整）：

- Class：绿系（light: emerald/teal，dark: emerald-400）
- Interface：蓝系（light: blue-600，dark: blue-400）
- Method：紫系（light: indigo-500/700，dark: violet-300）
- Field：橙系（light: amber-600/700，dark: amber-500）

渲染建议：
- 节点外框描边使用“节点类型主色”。
- 每行左侧放 4px 色条（同主色）；行底用极浅色 `tint` 作为分层底色。
- 文本颜色跟随主题：浅色主题用深灰，深色主题用浅灰/白。

## 4. 边样式（五类）

若提供 `edges[].kind`，可直接按类型映射样式；否则回退到 `style.line` 与 `style.marker` 控制。

默认映射建议：

- Inheritance（继承）：
  - 颜色：light `#38bdf8`（sky-400），dark `#bae6fd`（sky-200）
  - 线型：solid
  - 箭头：有（arrow）
- Interface-Impl（接口实现）：
  - 颜色：light `#a78bfa`（violet-300），dark `#c4b5fd`（violet-200）
  - 线型：dashed
  - 箭头：有
- Nesting（嵌套）：
  - 颜色：light `#f59e0b`，dark `#fbbf24`
  - 线型：solid
  - 箭头：无
- Generic-Bounds（泛型约束）：
  - 颜色：light `#fb7185`，dark `#fca5a5`
  - 线型：dotted
  - 箭头：无
- Reference（引用：对象创建/方法调用）：
  - 颜色：light `#22c55e`，dark `#86efac`
  - 线型：dotted
  - 箭头：有

> 注：即使采用“极简边写法”，只要提供 `kind`，渲染器就会自动套用上面的颜色/线型/箭头映射；如需更细粒度控制，可增加 `style` 覆盖。

## 5. 主题适配要点

- 使用 `html.theme-light` 判定是否浅色主题。
- 节点与边的颜色均需提供 light/dark 两套值；文字与面板底色同理。
- 图例（Legend）亦需在两种主题下保持对比度与可读性。

## 6. 布局与交互建议

- 布局：按 `layer` 分列、`order` 分行的网格布局足以应付演示场景。
- 缩放：d3-zoom 范围建议 `[0.2, 4]`，初始适度放大以提高可读性。
- 拖拽：拖动节点后，实时重绘连线；连线拐点可采用“右-垂直-右”三段式折线。

## 7. 示例片段

### 7.1 节点示例

```json
{
  "id": "c1",
  "layer": 1,
  "order": 0,
  "rows": [
    { "type": "class", "text": "Class C1" },
    { "type": "method", "text": "void foo()" },
    { "type": "field",  "text": "int count" }
  ]
}
```

### 7.2 边示例

```json
{
  "id": "e_c1_i1_impl",
  "source": "c1",
  "target": "i1",
  "kind": "interface-impl",
  "label": "Interface Implement",
  "attach": { "sourceRow": 1, "targetRow": 1 }
}
```

## 8. 自行实现时的检查清单

- [ ] 四类节点类型已覆盖，未出现 `generic` 节点类型。
- [ ] 五类边类型映射明确；未知 `kind` 回退到 `style`。
- [ ] 明暗主题切换时，节点描边、行底色、文字、边颜色与图例均可读。
- [ ] 拖拽与缩放无异常；平移/缩放时边与标签位置合理。
- [ ] 多条平行边有 `laneGap` 或自动错位，避免完全重叠。

---

如需将本指南与实际渲染保持一致，可参考本项目的 `GraphViewer.tsx` 与 `nodeTypePalette.ts` 中的配色与实现细节。

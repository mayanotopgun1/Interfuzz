#!/usr/bin/env node
/**
 * 移除指定 JSON 文件中所有顶层 nodes[*] 的 size 与 position 字段。
 * 使用方式：node scripts/strip-size-position.js public/graphs/output.json
 */
import fs from 'fs'
import path from 'path'

const REMOVE_META_LAYOUT_KEYS = ['c0ExtendLong','c0ExtendShort','labelDistanceFromSource','computed']
const REMOVE_NODE_KEYS = ['size','position','idExtraFix','minHeight']
const REMOVE_EDGE_STYLE_KEYS = ['routing','points']
const REMOVE_EDGE_KEYS = ['pathOffset']

function strip(file){
  const abs = path.resolve(file)
  const raw = fs.readFileSync(abs,'utf-8')
  let data
  try { data = JSON.parse(raw) } catch(e){
    console.error('JSON 解析失败，终止: ', e.message)
    process.exit(1)
  }
  if(data?.meta?.layout){
    for(const k of REMOVE_META_LAYOUT_KEYS){
      if(k in data.meta.layout) delete data.meta.layout[k]
    }
  }
  if(data?.meta?.nodeDefaults){
    for(const k of ['minHeight']){ if(k in data.meta.nodeDefaults) delete data.meta.nodeDefaults[k] }
  }
  if(Array.isArray(data.nodes)){
    data.nodes = data.nodes.map(n => {
      if(n && typeof n === 'object'){
        for(const k of REMOVE_NODE_KEYS){ if(k in n) delete n[k] }
      }
      return n
    })
  }
  if(Array.isArray(data.edges)){
    data.edges = data.edges.map(e => {
      if(e && typeof e === 'object'){
        for(const k of REMOVE_EDGE_KEYS){ if(k in e) delete e[k] }
        if(e.style && typeof e.style === 'object'){
          for(const k of REMOVE_EDGE_STYLE_KEYS){ if(k in e.style) delete e.style[k] }
          // 如果 style 变成空对象，删除它
          if(Object.keys(e.style).length === 0) delete e.style
        }
      }
      return e
    })
  }
  const out = JSON.stringify(data, null, 2)
  fs.writeFileSync(abs, out, 'utf-8')
  console.log('已删除冗余字段: meta.layout(' + REMOVE_META_LAYOUT_KEYS.join(',') + '), nodes(' + REMOVE_NODE_KEYS.join(',') + '), edges(' + REMOVE_EDGE_KEYS.join(',') + ' + style.' + REMOVE_EDGE_STYLE_KEYS.join(',') + ')')
}

const target = process.argv[2]
if(!target){
  console.error('请提供文件路径，例如: node scripts/strip-size-position.js public/graphs/output.json')
  process.exit(1)
}
strip(target)

export type CaseStudy = {
  id: string
  title: string
  compiler: 'HotSpot' | 'R8'
  status: 'Fixed' | 'Confirmed'
  priority: 'P1' | 'P2' | 'P3'
  symptom: string
  link: string
  rootCause: string
  keyStructure: string
  code: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'JDK-8357782',
    title: 'HotSpot: 跨类引用中静态初始化副作用导致的语义错误',
    compiler: 'HotSpot',
    status: 'Fixed',
    priority: 'P3',
    symptom: '语义错误',
    link: 'https://bugs.openjdk.org/browse/JDK-8357782',
    rootCause:
      "JIT 未正确建模 C4 的静态初始化对 C3.field 的写入副作用。编译 C2.C3.foo() 时读取了初始 null，并错误假定 new C4() 不会影响该字段，导致使用了陈旧值。",
    keyStructure: '引用关系：C4.<clinit> 写 C3.field → 在 C3.foo() 期间被读取',
    code: `class C2 {
  class C3 {
    static String field;
    static void foo() {
      new C4(field);
    }
  }
  static class C4 {
    static { C3.field = "Hello"; }
    C4(String arg1) { System.out.print(arg1); }
  }
}
class C1 {
  public static void main(String[] args) {
    C2.C3.foo();
  }
}`,
  },
  {
    id: 'R8-426351560',
    title: 'R8: 继承与接口调用链处理不当导致的 IllegalAccessError',
    compiler: 'R8',
    status: 'Fixed',
    priority: 'P2',
    symptom: '语义错误',
    link: 'https://issuetracker.google.com/issues/426351560',
    rootCause:
      'R8 在生成兼容性代码时未尊重 C0 → C1 → I 的调用链，绕过了中间类 C1，使 C0 直接调用接口 I 上的方法，违反访问规则，导致运行期 IllegalAccessError。',
    keyStructure: '继承与接口：C0 继承 C1，C1 实现 I（调用链 C0 → C1 → I）',
    code: `public class C1 implements I {
  public void foo2() {
    System.out.println("Cr.foo2()");
  }
}
interface I {
  default String foo() {
    System.out.println("I.foo2()");
  }
}
class C0 extends C1 {
  public static void main(java.lang.String[] strArr) {
    C0 c = new C0();
    c.foo();
  }
}`,
  },
]

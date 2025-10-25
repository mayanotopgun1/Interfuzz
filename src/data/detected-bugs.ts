export type BugRecord = {
  no: number
  id: string
  link: string
  compiler: 'HotSpot' | 'ART' | 'R8'
  symptom: 'Crash' | 'Semantic Error'
  status: 'Fixed' | 'Confirmed' | 'Duplicate'
  interClassRelated: boolean
  priority: 'P1' | 'P2' | 'P3' | 'P4'
}

export const detectedBugs: BugRecord[] = [
  { no: 1, id: '8357782', link: 'https://bugs.openjdk.org/browse/JDK-8357782', compiler: 'HotSpot', symptom: 'Semantic Error', status: 'Fixed', interClassRelated: true, priority: 'P3' },
  { no: 2, id: '8357381', link: 'https://bugs.openjdk.org/browse/JDK-8357381', compiler: 'HotSpot', symptom: 'Crash', status: 'Confirmed', interClassRelated: true, priority: 'P3' },
  { no: 3, id: '8361699', link: 'https://bugs.openjdk.org/browse/JDK-8361699', compiler: 'HotSpot', symptom: 'Crash', status: 'Confirmed', interClassRelated: true, priority: 'P3' },
  { no: 4, id: '8357242', link: 'https://bugs.openjdk.org/browse/JDK-8357242', compiler: 'HotSpot', symptom: 'Semantic Error', status: 'Duplicate', interClassRelated: false, priority: 'P4' },
  { no: 5, id: '418897611', link: 'https://issuetracker.google.com/issues/418897611', compiler: 'ART', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: true, priority: 'P2' },
  { no: 6, id: '369670481', link: 'https://issuetracker.google.com/issues/369670481', compiler: 'ART', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: true, priority: 'P3' },
  { no: 7, id: '369739225', link: 'https://issuetracker.google.com/issues/369739225', compiler: 'ART', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: true, priority: 'P3' },
  { no: 8, id: '405152615', link: 'https://issuetracker.google.com/issues/405152615', compiler: 'ART', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: false, priority: 'P2' },
  { no: 9, id: '405149431', link: 'https://issuetracker.google.com/issues/405149431', compiler: 'ART', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: false, priority: 'P3' },
  { no: 10, id: '410253904', link: 'https://issuetracker.google.com/issues/410253904', compiler: 'ART', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: false, priority: 'P3' },
  { no: 11, id: '405149432', link: 'https://issuetracker.google.com/issues/405149432', compiler: 'ART', symptom: 'Semantic Error', status: 'Duplicate', interClassRelated: true, priority: 'P3' },
  { no: 12, id: '412524379', link: 'https://issuetracker.google.com/issues/412524379', compiler: 'R8', symptom: 'Crash', status: 'Fixed', interClassRelated: true, priority: 'P1' },
  { no: 13, id: '419464490', link: 'https://issuetracker.google.com/issues/419464490', compiler: 'R8', symptom: 'Crash', status: 'Fixed', interClassRelated: true, priority: 'P1' },
  { no: 14, id: '379347946', link: 'https://issuetracker.google.com/issues/379347946', compiler: 'R8', symptom: 'Semantic Error', status: 'Fixed', interClassRelated: true, priority: 'P1' },
  { no: 15, id: '420228751', link: 'https://issuetracker.google.com/issues/420228751', compiler: 'R8', symptom: 'Semantic Error', status: 'Fixed', interClassRelated: true, priority: 'P2' },
  { no: 16, id: '367915233', link: 'https://issuetracker.google.com/issues/367915233', compiler: 'R8', symptom: 'Semantic Error', status: 'Fixed', interClassRelated: true, priority: 'P2' },
  { no: 17, id: '419404081', link: 'https://issuetracker.google.com/issues/419404081', compiler: 'R8', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: true, priority: 'P2' },
  { no: 18, id: '426351560', link: 'https://issuetracker.google.com/issues/426351560', compiler: 'R8', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: true, priority: 'P2' },
  { no: 19, id: '418719343', link: 'https://issuetracker.google.com/issues/418719343', compiler: 'R8', symptom: 'Semantic Error', status: 'Confirmed', interClassRelated: true, priority: 'P2' },
  { no: 20, id: '372806451', link: 'https://issuetracker.google.com/issues/372806451', compiler: 'R8', symptom: 'Semantic Error', status: 'Duplicate', interClassRelated: true, priority: 'P2' },
]

export function summarize(bugs: BugRecord[]) {
  const total = bugs.length
  const byCompiler = groupCount(bugs, 'compiler') as Record<BugRecord['compiler'], number>
  const byStatus = groupCount(bugs, 'status') as Record<BugRecord['status'], number>
  const byPriority = groupCount(bugs, 'priority') as Record<BugRecord['priority'], number>
  const interClassTrue = bugs.filter((b) => b.interClassRelated).length
  return { total, byCompiler, byStatus, byPriority, interClassTrue }
}

function groupCount<T extends keyof BugRecord>(arr: BugRecord[], key: T) {
  return arr.reduce((acc: any, it) => {
    acc[it[key]] = (acc[it[key]] ?? 0) + 1
    return acc
  }, {})
}

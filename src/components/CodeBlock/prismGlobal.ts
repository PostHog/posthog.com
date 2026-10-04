// The prismjs language files register themselves on a global `Prism`. ES imports run in order, so
// importing this module first defines that global before languages.tsx imports them.
import Prism from 'prism-react-renderer/prism'
;(globalThis as any).Prism = Prism

export default Prism

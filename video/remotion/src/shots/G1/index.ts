import type {ShotDef, BgSpec, FootageSpec} from '../../common';
import {C01} from './C01';
import {C02a} from './C02a';
import {C02b} from './C02b';
import {C02c} from './C02c';
import {C03} from './C03';
import {C04a} from './C04a';
import {C04b} from './C04b';
import {C05} from './C05';
import {C07} from './C07';
import {C08a, C08b} from './C08';
import {C09a, C09b} from './C09';
import {C10a, C10b} from './C10';
import {C11a, C11b, C11c} from './C11';
import {C12} from './C12';
import {C13a, C13b, C13c} from './C13';
import {C14} from './C14';
import {C15a} from './C14';
import {C15b, C15c} from './C15';
import {C16} from './C16';
import {C17a, C17b, C18a} from './C17';
import {C18b, C18c} from './C18';
import {C19a, C19b} from './C19';
import {C20a, C20b} from './C20';
import {C21a, C21b} from './C21';
import {C22a, C22b, C22c} from './C22';
import {C23a, C23b, C23c} from './C23';
import {C24a, C24b, C24c} from './C24';
import {C25, C26, C27} from './C25';
import {C06a} from './C06a';
import {C06b} from './C06b';
import {C06c} from './C06c';
// 组 G1：第 1 章 THE COUNCIL（C01–C06）。数组顺序即层序（后者在上）。
// 镜头组件：const N = useCurrentFrame() + F0（F0 = 本镜头 from）；图元 import from '../../ui'。
export const SHOTS_G1: ShotDef[] = [
  {id: 'G1-C01', from: 91, to: 257, Comp: C01},
  {id: 'G1-C02a', from: 258, to: 408, Comp: C02a},
  {id: 'G1-C02b', from: 409, to: 554, Comp: C02b},
  {id: 'G1-C02c', from: 555, to: 678, Comp: C02c},
  {id: 'G1-C03', from: 679, to: 880, Comp: C03},
  {id: 'G1-C04a', from: 881, to: 1120, Comp: C04a},
  {id: 'G1-C04b', from: 1121, to: 1400, Comp: C04b},
  {id: 'G1-C05', from: 1412, to: 1540, Comp: C05},
  {id: 'G1-C06a', from: 1541, to: 1672, Comp: C06a},
  {id: 'G1-C06b', from: 1673, to: 1881, Comp: C06b},
  {id: 'G1-C06c', from: 1882, to: 2003, Comp: C06c},
  {id: 'G1-C07', from: 2004, to: 2233, Comp: C07},
  {id: 'G1-C08a', from: 2234, to: 2400, Comp: C08a},
  {id: 'G1-C08b', from: 2401, to: 2554, Comp: C08b},
  {id: 'G1-C09a', from: 2566, to: 2671, Comp: C09a},
  {id: 'G1-C09b', from: 2672, to: 2841, Comp: C09b},
  {id: 'G1-C10a', from: 2842, to: 2994, Comp: C10a},
  {id: 'G1-C10b', from: 2995, to: 3157, Comp: C10b},
  {id: 'G1-C11a', from: 3158, to: 3388, Comp: C11a},
  {id: 'G1-C11b', from: 3389, to: 3474, Comp: C11b},
  {id: 'G1-C11c', from: 3475, to: 3652, Comp: C11c},
  {id: 'G1-C12', from: 3666, to: 3948, Comp: C12},
  {id: 'G1-C13a', from: 3949, to: 4205, Comp: C13a},
  {id: 'G1-C13b', from: 4206, to: 4272, Comp: C13b},
  {id: 'G1-C13c', from: 4273, to: 4511, Comp: C13c},
  {id: 'G1-C14', from: 4512, to: 4669, Comp: C14},
  {id: 'G1-C15a', from: 4670, to: 4890, Comp: C15a},
  {id: 'G1-C15b', from: 4891, to: 5051, Comp: C15b},
  {id: 'G1-C15c', from: 5052, to: 5275, Comp: C15c},
  {id: 'G1-C16', from: 5276, to: 5452, Comp: C16},
  {id: 'G1-C17a', from: 5453, to: 5676, Comp: C17a},
  {id: 'G1-C17b', from: 5677, to: 5809, Comp: C17b},
  {id: 'G1-C18a', from: 5810, to: 6135, Comp: C18a},
  {id: 'G1-C18b', from: 6136, to: 6246, Comp: C18b},
  {id: 'G1-C18c', from: 6247, to: 6360, Comp: C18c},
  {id: 'G1-C19a', from: 6361, to: 6532, Comp: C19a},
  {id: 'G1-C19b', from: 6533, to: 6810, Comp: C19b},
  {id: 'G1-C20a', from: 6811, to: 6933, Comp: C20a},
  {id: 'G1-C20b', from: 6934, to: 7220, Comp: C20b},
  {id: 'G1-C21a', from: 7223, to: 7500, Comp: C21a},
  {id: 'G1-C21b', from: 7501, to: 7756, Comp: C21b},
  {id: 'G1-C22a', from: 7757, to: 7898, Comp: C22a},
  {id: 'G1-C22b', from: 7899, to: 8013, Comp: C22b},
  {id: 'G1-C22c', from: 8014, to: 8310, Comp: C22c},
  {id: 'G1-C23a', from: 8311, to: 8413, Comp: C23a},
  {id: 'G1-C23b', from: 8414, to: 8646, Comp: C23b},
  {id: 'G1-C23c', from: 8647, to: 8847, Comp: C23c},
  {id: 'G1-C24a', from: 8848, to: 8989, Comp: C24a},
  {id: 'G1-C24b', from: 8990, to: 9145, Comp: C24b},
  {id: 'G1-C24c', from: 9146, to: 9291, Comp: C24c},
  {id: 'G1-C25', from: 9292, to: 9812, Comp: C25},
  {id: 'G1-C26', from: 9823, to: 9952, Comp: C26},
  {id: 'G1-C27', from: 9953, to: 9988, Comp: C27},
];
export const BG_G1: BgSpec[] = [];
export const FOOTAGE_G1: FootageSpec[] = [];

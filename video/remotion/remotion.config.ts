import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';

// 本机环境：Remotion 自带 Chrome-for-Testing 的下载被网络挡，必须指向系统 Edge。
// 优先级：环境变量 REMOTION_BROWSER_EXECUTABLE > 本机常见 Edge 路径。
const EDGE_CANDIDATES = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const fromEnv = process.env.REMOTION_BROWSER_EXECUTABLE;
const browser = fromEnv && existsSync(fromEnv) ? fromEnv : EDGE_CANDIDATES.find((p) => existsSync(p));

if (browser) {
  Config.setBrowserExecutable(browser);
  Config.setChromiumOpenGlRenderer('swangle');
}

// 成片规格：1920×1080 / 30fps / H.264
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(18);

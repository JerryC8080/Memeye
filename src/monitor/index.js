/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:26:27
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 11:33:20
 * @Description
 * 
 * How to use this module
 * 
 * import {Process, System} from 'monitor';
 * const ProcessMonitor = new Process(process, options);
 * const SystemMonitor = new System(process, options);
 * 
 * ProcessMonitor.start()
 * ProcessMonitor.on('change', () => { // do logic });
 * 
 */

import Process from './Process';
import System from './System';

export {
  Process,
  System,
};

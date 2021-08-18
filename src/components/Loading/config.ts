
import store from '../../store/index';

let needLoadingRequestCount = 0; // 需要loading请求个数

/**
 * 显示全屏loading加載
 */
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        openLoading();
    }
    needLoadingRequestCount++;
}

/**
 * 取消全屏loading加載
 */
export function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        closeLoading();
    }
}

/**
 * 开启 loading浮层
 */
export function openLoading() {
    store.dispatch('setLoadingAsync',true);
}
/**
 * 关闭 loading浮层
 */
export function closeLoading() {
    store.dispatch('setLoadingAsync',false);
}
function sliceProtocol(url = '') {
    return url.replace(/^(http|https):/, '');
}
export { sliceProtocol };

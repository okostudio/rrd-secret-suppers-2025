const config = {
    total: null,
    loaded: 0,
};

function LoadImage(source, callBackFunction) {
    const image = {
        el: null,
        source: null,
    };
    // check if image is found in image cache.
    const index = window.imageCache.findIndex((img) => img.source === source);
    if (index > -1) {
        image.el = window.imageCache[index].el;
        image.source = window.imageCache[index].source;
    } else {
        image.el = document.createElement("img");
        image.el.src = image.source = source;
    }

    if (image.el.complete) {
        // if image was already loaded, use image.
        config.loaded++;
        if (config.loaded === config.total) {
            setTimeout(callBackFunction, 150);
        }
    } else {
        // otherwise, load image, and store it once loaded.
        window.imageCache.push(image);
        image.el.onload = () => {
            // window.imageCache.push(image);
            config.loaded++;
            if (config.loaded === config.total) callBackFunction();
        };
    }
    return image.el;
}

export function ImagePreloader(imageURLArray, callBack) {
    if (!window.imageCache) {
        window.imageCache = [];
    }
    config.total = window.imageCache.length + imageURLArray.length;
    config.loaded = window.imageCache.length;
    const imageArray = imageURLArray.map((image) => {
        return LoadImage(image, callBack);
    });

    return imageArray;
}

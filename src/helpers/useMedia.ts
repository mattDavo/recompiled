// Adapted from https://github.com/lessmess-dev/react-media-hook
import { useState, useEffect, useCallback } from 'react';

function fallbackMathMedia(query: string) {
    if (typeof matchMedia !== 'function') {
        return null;
    }
    return matchMedia(query);
}

function omitMatchMediaResult(matchMediaResult) {
    if (!matchMediaResult) {
        return null;
    }
    return { media: matchMediaResult.media, matches: matchMediaResult.matches };
}

function useMedia(query: string) {
    const [result, setResult] = useState(function () {
        return omitMatchMediaResult(fallbackMathMedia(query));
    });

    const callback = useCallback(
        function (matchMediaResult) {
            return setResult(omitMatchMediaResult(matchMediaResult));
        },
        [setResult],
    );

    useEffect(
        function () {
            const matchMediaResult = fallbackMathMedia(query);
            callback(matchMediaResult);
            if (!matchMediaResult) {
                return () => {};
            }
            matchMediaResult.addListener(callback);
            return function () {
                return matchMediaResult.removeListener(callback);
            };
        },
        [callback, query],
    );

    return result;
}

function useMediaPredicate(query) {
    const result = useMedia(query);
    return (result && result.matches) || false;
}

export { useMedia, useMediaPredicate };

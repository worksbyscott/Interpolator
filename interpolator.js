

/*

    Interpolator

    Value 1 = Intial value 
    Value 2 = Final value to animate to
    progress = Value between 0-1 that represents the percentage of the animation

*/


// Colour Funcations

const is = {
    hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
    rgb: a => /^rgb/.test(a),
    hsl: a => /^hsl/.test(a),
    col: a => (is.hex(a) || is.rgb(a) || is.hsl(a)),
}

const convertToRgba = (colour) => {
    return is.hex(colour) ? hexToRgba(colour)
        : is.rgb(colour) ? rbgToRgba(colour)
            : is.hsl(colour) ? hslToRgba(colour)
                : colour
}

const hexToRgba = (colour, alpha = 1) => {
    const [r, g, b] = colour.match(/\w\w/g).map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
};

const rbgToRgba = (colour, alpha = 1) => {
    const [r, g, b] = colour.replace(/[^\d,]/g, '').split(',')
    return `rgba(${r},${g},${b},${alpha})`
}

const deconstructRgba = (rgba) => {
    return rgba.replace(/[^\d,]/g, '').split(',').map(x => parseInt(x))
}

const formatRbga = (colour) => {
    return `rgba(${colour.r},${colour.g},${colour.b})`
}


/*
    Lerp funcation interpolates two number values 
*/

const lerp = (start, end, progress) => {
    return start * (1 - progress) + end * progress
}

/*
    Interpolate the colour 
    Accepts: HEX, RBG, RGBA

*/

const interpolateColour = (colourA, colourB, progress) => {
    const [r1, g1, b1, a1] = deconstructRgba(convertToRgba(colourA))
    const [r2, g2, b2, a2] = deconstructRgba(convertToRgba(colourB))
    return formatRbga({
        r: Math.round(lerp(r1, r2, progress)),
        g: Math.round(lerp(g1, g2, progress)),
        b: Math.round(lerp(b1, b2, progress)),
    })
}

/* 

Core interpolate funcation that suppports all animations

*/

const interpolate = (value1, value2, progress) => {
    const isColour = is.col(value1) || is.col(value2);
    return isColour ? interpolateColour(value1, value2, progress) : lerp(value1, value2, progress);
}

export {
    is,
    interpolate,
    interpolateColour
}
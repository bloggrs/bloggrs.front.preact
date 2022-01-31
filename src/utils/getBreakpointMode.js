

export default () => {
    const breakpoints = [
        "default", 'sm', 'md', 'lg', 'xl', '2xl'
    ]
    const screens = {
        "default": 0,
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        '2xl': 1536
    };
    const { innerWidth } = window;
    let mode = "default";
    for (let brk of breakpoints) {
        const switch_mode_rule = screens[brk] < innerWidth;
        if (switch_mode_rule) mode = brk;
    }
    return mode;
}
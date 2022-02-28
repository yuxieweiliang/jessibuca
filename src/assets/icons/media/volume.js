const volume = {};

export const off = `
M871.253333 139.52a39.509333 39.509333 0 1 1 55.850667 55.936L195.370667 927.146667a40.405333 40.405333 0 0 1-27.904 11.562666 41.088 41.088 0 0 1-27.776-11.434666 39.68 39.68 0 0 1-0.170667-56.021334l120.618667-120.618666h-1.237334c-60.117333 0-103.893333-42.453333-112-108.373334-9.088-65.92-7.253333-178.858667 0-238.933333 8.533333-62.293333 54.613333-105.173333 112-105.173333h78.08l149.077334-121.941334c18.133333-15.36 50.176-29.866667 75.008-30.250666 45.141333 0 86.698667 31.573333 101.589333 82.176 5.888 21.248 8.192 42.410667 9.984 62.805333l3.584 28.842667c0.597333 4.437333 1.109333 8.704 1.578667 13.226666L871.253333 139.52z m-236.373333 446.336c6.144-5.973333 19.754667-10.24 25.898667-8.661333 16.597333 4.224 19.84 27.989333 19.584 46.72-0.768 54.272-2.56 92.032-5.461334 115.370666l-2.048 19.242667v0.341333c-1.962667 19.370667-3.968 39.381333-9.685333 60.757334-15.061333 50.517333-55.381333 83.285333-101.248 83.285333l-4.522667-0.042667c-25.344 0-52.778667-15.189333-68.394666-28.416l-55.466667-42.922666c-21.12-15.701333-14.890667-40.704-3.072-55.210667 8.874667-10.794667 115.072-108.288 170.88-159.488 18.901333-17.365333 32-29.44 33.578667-30.976z
`;

export const up = `
M569.898667 275.2c-2.133333-20.736-4.394667-42.24-9.898667-63.744C545.066667 160.085333 503.509333 128 459.008 128c-24.832-0.085333-56.234667 15.189333-74.069333 30.72l-147.626667 123.605333h-77.226667c-56.874667 0-102.570667 43.818667-111.232 107.093334-7.338667 60.757333-9.130667 175.36 0 242.218666 7.936 66.858667 51.626667 110.037333 111.232 110.037334h77.226667l150.485333 125.44c15.445333 13.44 42.666667 28.842667 67.754667 28.842666l4.48 0.042667c45.354667 0 85.333333-33.28 100.266667-84.48 5.674667-21.717333 7.68-42.026667 9.557333-61.653333l0.042667-0.341334 2.005333-19.584c7.68-63.445333 7.68-372.864 0-435.84l-2.005333-18.858666z m172.8 1.92a38.698667 38.698667 0 0 0-54.570667-10.112 40.832 40.832 0 0 0-9.728 55.808c34.218667 50.432 53.034667 117.589333 53.034667 189.184 0 71.552-18.816 138.752-53.034667 189.184a40.789333 40.789333 0 0 0 9.813333 55.808 38.613333 38.613333 0 0 0 54.485334-10.112c43.178667-63.658667 67.029333-147.072 67.029333-234.88s-23.850667-171.221333-67.029333-234.88zM823.04 137.386667a38.613333 38.613333 0 0 1 54.485333 10.069333C944.469333 246.058667 981.333333 375.552 981.333333 512c0 136.533333-36.864 265.984-103.808 364.544a38.485333 38.485333 0 0 1-54.442666 10.069333 40.832 40.832 0 0 1-9.813334-55.808c57.856-85.290667 89.770667-198.528 89.770667-318.805333 0-120.234667-31.914667-233.472-89.813333-318.762667a40.874667 40.874667 0 0 1 9.813333-55.808z
`;

export const down = `
M645.973333 211.456c5.504 21.504 7.722667 43.008 9.898667 63.786667l2.005333 18.858666c7.68 62.976 7.68 372.394667 0 435.84l-2.005333 19.584-0.042667 0.341334c-1.92 19.626667-3.925333 39.936-9.557333 61.610666-15.018667 51.285333-55.04 84.522667-100.437333 84.522667l-4.48-0.042667c-25.088 0-52.352-15.36-67.84-28.8l-150.613334-125.482666H245.546667c-59.733333 0-103.424-43.178667-111.36-110.037334-9.130667-66.816-7.338667-181.461333 0-242.218666 8.661333-63.274667 54.442667-107.093333 111.36-107.093334h77.354666l147.797334-123.648c17.792-15.488 49.237333-30.762667 74.112-30.677333 44.586667 0 86.144 32.085333 101.12 83.456z m128.341334 55.552a38.826667 38.826667 0 0 1 54.528 10.112C872.106667 340.821333 896 424.234667 896 512s-23.893333 171.178667-67.157333 234.88a39.04 39.04 0 0 1-32.170667 17.237333 38.485333 38.485333 0 0 1-22.357333-7.125333 40.746667 40.746667 0 0 1-9.813334-55.808c34.261333-50.474667 53.12-117.674667 53.12-189.184 0-71.552-18.858667-138.666667-53.12-189.184a40.746667 40.746667 0 0 1 9.813334-55.808z
`;

volume.off = off;
volume.up = up;
volume.down = down;
export default volume;

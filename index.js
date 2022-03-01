/*
If you're reading this, hello!
Please take a look around at my disgusting code.
If you can learn anything from it, that's great!
Please don't copy substantial parts of this project,
if you use pieces of it, please credit me. 
Twitter: @charbob_nft
Eth: charbob.eth
Tez: charbob.tez

good hash = oooGXiZrCEZJvvnpaTnQSmrmSGXiNWaAwtv1f7K1BC3Z43q1GvE
*/


console.clear();

let num_cols = Math.floor(fxrandrange(1, 35));
let num_rows = Math.floor(fxrandrange(1, 35));
let bg_color = select_bg_color();
if (bg_color > 150) bg_name = "light";
if (bg_color <= 150) bg_name = "dark";

let num_red_dots = Math.min(
    Math.floor((fxrand() * 2 + 0.125) ** -1),
    num_cols * num_rows); // prevents more red dots than total dots
let offset_direction_hash = Math.floor(fxrandrange(0, 4));
let offset_direction = '';
if (offset_direction_hash == 0) offset_direction = 'down';
if (offset_direction_hash == 1) offset_direction = 'right';
if (offset_direction_hash == 2) offset_direction = 'up';
if (offset_direction_hash == 3) offset_direction = 'left';

window.$fxhashFeatures = {
    "background": bg_name,
    "number of columns": num_cols,
    "number of rows": num_rows,
    "distortion direction": offset_direction,
    "number of red dots": num_red_dots
}

let feature_list = window.$fxhashFeatures;

function setup() {
    let page_width = window.innerWidth;
    let page_height = window.innerHeight;
    let canvas_size = Math.min(page_width, page_height) - 20;
    createCanvas(canvas_size, canvas_size); // width, height
    noStroke();
}

function draw() {
    //debug();

    background(bg_color);
    noLoop();

    let canvas_size = width;
    let margin = 0.15 * canvas_size;

    let draw_area = canvas_size - margin * 2;

    let horiz_scale = draw_area / num_cols;
    let vert_scale = draw_area / num_rows;

    let max_vert_offset = 10;
    let max_horiz_offset = 10;

    let min_dot_x = margin;
    let min_dot_y = margin;
    let max_dot_x = canvas_size - margin;
    let max_dot_y = canvas_size - margin;

    let red_dots = red_dot_list();

    for (let col_num = 0; col_num < num_cols; col_num++) {
        for (let row_num = 0; row_num < num_rows; row_num++) {

            let row_num_normal = 0;
            let col_num_normal = 0;

            if (offset_direction_hash == 0) {
                row_num_normal = row_num / num_rows;
                col_num_normal = 0;
            } else if (offset_direction_hash == 1) {
                row_num_normal = 0;
                col_num_normal = col_num / num_cols;
            } else if (offset_direction_hash == 2) {
                row_num_normal = (num_rows - row_num) / num_rows;
                col_num_normal = 0;
            } else if (offset_direction_hash == 3) {
                row_num_normal = 0;
                col_num_normal = (num_cols - col_num) / num_cols;
            }

            let x_scaled = col_num * horiz_scale;
            let y_scaled = row_num * vert_scale;

            let x_centered = x_scaled + margin + horiz_scale / 2;
            let y_centered = y_scaled + margin + vert_scale / 2;

            let x_offset_multiplier = row_num_normal ** 3;
            let y_offset_multiplier = col_num_normal ** 3;

            let x_offset_factor = fxrandrange(-max_horiz_offset, max_horiz_offset) * x_offset_multiplier;
            let y_offset_factor = fxrandrange(-max_vert_offset, max_vert_offset) * y_offset_multiplier;

            let x_offset = x_centered + x_offset_factor;
            let y_offset = y_centered + y_offset_factor;

            // check if dot is within margin
            if (x_offset > max_dot_x || x_offset < min_dot_x || y_offset > max_dot_y || y_offset < min_dot_y) continue;

            // select color
            let circle_color = fxrandrange(0, 255) - row_num - col_num;


            for (let i = 0; i < red_dots.length; i++) {
                if (col_num == red_dots[i][0] && row_num == red_dots[i][1]) circle_color = 'red';
            }

            fill(circle_color);

            let diameter = fxrandrange(
                min(horiz_scale / 2, vert_scale / 2),
                canvas_size / 88
            );

            circle(
                x_offset,
                y_offset,
                diameter * 1.2);

            if (circle_color == 'red') {
                for (let i = 0; i < 10; i++) {
                    shine_color = color(255, 0, 0, 2);
                    fill(shine_color)
                    circle(
                        x_offset,
                        y_offset,
                        diameter * i);
                }
            }
        }
    }
    fxpreview();
}

function red_dot_list() {
    let red_dots = [];
    for (let i = 0; i < num_red_dots; i++) {
        let x_coord = Math.floor(fxrandrange(0, num_cols));
        let y_coord = Math.floor(fxrandrange(0, num_rows));
        let dot_coords = [x_coord, y_coord];
        red_dots.push(dot_coords);
    }
    return red_dots;
}

function debug() {
    // this code writes the values to the DOM as an example
    const container = document.createElement("div");
    var hash_line = `\nrandom hash: ${fxhash}\n`;
    var rand_line = `\nsome pseudo random values: [ ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()},... ]\n`;
    var features = `
        background: ${feature_list["background"]}
        num columns: ${feature_list["number of columns"]}
        num rows: ${feature_list["number of rows"]}
        num red dots: ${feature_list["number of red dots"]}
        distortion direction: ${feature_list["distortion direction"]}
        `;
    container.innerText = (
        //hash_line +
        //rand_line +
        features
    );
    document.body.prepend(container);
}

function select_bg_color() {
    if (fxrand() > 0.6) return 30;
    else return 248;
}

function fxrandrange(num1, num2) {
    if (num1 == num2) return num1;
    let low_num = Math.min(num1, num2);
    let high_num = Math.max(num1, num2);
    let difference = high_num - low_num;
    let output = low_num + fxrand() * difference;
    return output;
}
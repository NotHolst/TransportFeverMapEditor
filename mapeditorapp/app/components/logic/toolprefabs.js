import { Tool, Options, Option } from "./tools";

let strengthOption = new Option("strength", 5);
let sizeOption = new Option("size", 5, 1);
let raiseTool = new Tool("square", null, new Options([strengthOption], [sizeOption]));

let averageTool = new Tool("", { brushscaler: averageBrush, tooling: average }, new Options([], [sizeOption.copy()]));

function average(tool, toolableVertices) {
	let tv = toolableVertices;
	tool.iterateBrush((x, y, strength) => {
		if (strength > 0) {
			let val = 0;
			let count = 0;
			for (let xm = -1; xm <= 1; xm++) {
				for (let ym = -1; ym <= 1; ym++) {
					if (tv[y + ym] != null && tv[y + ym][x + xm] != null) {
						val += tv[y + ym][x + xm].height;
					} else {
						count++;
					}
				}
			}

			if (tv[y] != null && tv[y][x] != null) {
				tv[y][x].height = val / (9 - count);
			}
		}
	});
}

function averageBrush(tool) {
	let size = tool.brushOptions.size.value + 1;
	let brush = [];
	for (let y = 0; y < size; y++) {
		brush[y] = [];
		for (let x = 0; x < size; x++) {
			if (x == 0 || x == size - 1 || y == 0 || y == size - 1) {
				brush[y][x] = 0;
			} else {
				brush[y][x] = 1;
			}
		}
	}
	return brush;
}

export { raiseTool, averageTool };

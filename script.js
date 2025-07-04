// Provided data
const props = {
    0: { id: "A000027", name: "The positive integers (natural numbers)", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    1: { id: "A005843", name: "The nonnegative even numbers", numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32] },
    2: { id: "A000040", name: "The prime numbers", numbers: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53] },
    3: { id: "A000041", name: "The partition numbers", numbers: [1, 1, 2, 3, 5, 7, 11, 15, 22, 30, 42, 56, 77, 101, 135, 176, 231] },
    4: { id: "A000045", name: "Fibonacci numbers", numbers: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987] },
    5: { id: "A002182", name: "Highly composite numbers", numbers: [1, 2, 4, 6, 12, 24, 36, 48, 60, 120, 180, 240, 360, 720, 840, 1260] },
    6: { id: "A000079", name: "Powers of 2", numbers: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] },
    7: { id: "A001654", name: "Golden rectangle numbers", numbers: [1, 2, 6, 15, 40, 104, 273, 714, 1870, 4895, 12816, 33552, 87841, 229970, 602070, 1576239] },
    8: { id: "A000108", name: "The Catalan numbers", numbers: [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845] },
    9: { id: "A000244", name: "Power of 3", numbers: [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049, 177147, 531441, 1594323, 4782969, 14348907] },
};

// Calculation functions
function calc(sum, count, prop, precision = 2) {
    if (count <= 0 || prop.length === 0) {
        return [];
    }
    if (prop.length > count) {
        prop = prop.slice(0, count);
    }
    if (prop.length < count) {
        let additional = Array(count - prop.length).fill(0);
        prop = prop.concat(additional);
    }
    let total = prop.reduce((acc, val) => acc + val, 0);
    if (total === 0) {
        return Array(prop.length).fill(0);
    }
    return prop.map(value => {
        let proportion = (value / total) * sum;
        return parseFloat(proportion.toFixed(precision));
    });
}

function test(sum, total) {
    return Math.abs(total - sum) < 1e-10;
}

// Populate dropdown
const seqSelect = document.getElementById('sequence');
Object.entries(props).forEach(([key, val]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = `${val.name} (${val.numbers.slice(0, 5).join(', ')}...)`;
    seqSelect.appendChild(opt);
});
seqSelect.value = '4';

// Form handler
document.getElementById('propForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const key = seqSelect.value;
    const sum = parseFloat(document.getElementById('sum').value);
    const count = parseInt(document.getElementById('count').value, 10);
    const precision = parseInt(document.getElementById('precision').value, 10);

    const prop = props[key].numbers;
    const result = calc(sum, count, prop, precision);
    const total = result.reduce((acc, val) => acc + val, 0);
    const isValid = test(sum, total);

    let output = `<p>Input sequence: [${prop.slice(0, count).join(', ')}]</p>`;
    output += `<p>Proportional result: [${result.join(', ')}]</p>`;
    output += `<p>Check sum: ${isValid ? `<span class="success">${total}</span>` : `<span class="error">${total}</span>`}</p>`;

    document.getElementById('output').innerHTML = output;
});
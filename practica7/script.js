$(document).ready(function() {
    const matrix = [
        [0, 2, 5, 7, 6],
        [0, 0, 0, 3, 8],
        [2, 9, 6, 3, 4],
        [1, 5, 6, 1, 4],
        [0, 9, 2, 5, 0]
    ];

    function renderMatrix() {
        const tableBody = $('#matrixTable');
        tableBody.empty();
        matrix.forEach((row, rowIndex) => {
            const tr = $('<tr></tr>');
            row.forEach((cell, cellIndex) => {
                const td = $('<td></td>').attr('contenteditable', 'true').text(cell);
                td.on('input', function() {
                    const value = $(this).text();
                    if (!/^\d*$/.test(value)) {  // Solo permite números
                        $(this).text(value.replace(/[^\d]/g, ''));
                    }
                });
                td.on('focusout', function() {
                    let value = $(this).text();
                    if (value === '') { // Si está vacío, cambiar a 0
                        value = 0;
                        $(this).text(value);
                    }
                    matrix[rowIndex][cellIndex] = parseInt(value);
                });
                tr.append(td);
            });
            tableBody.append(tr);
        });
    }

    function countZeros() {
        let resultText = '';
        matrix.forEach((row, index) => {
            const zeroCount = row.filter(num => num === 0).length;
            resultText += `Fila ${index + 1}: ${zeroCount} ceros<br>`;
        });
        $('#resultDisplay').html(resultText);
    }

    $('#countZerosBtn').on('click', countZeros);

    renderMatrix();
});

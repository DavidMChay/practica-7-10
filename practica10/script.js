$(document).ready(function() {
    let matrix = [];
    let size = 0;


    function generateEditableMatrix(size) {
        const tableBody = $('#matrixTable');
        tableBody.empty();
        matrix = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            const tr = $('<tr></tr>');
            for (let j = 0; j < size; j++) {
                const td = $('<td></td>').attr('contenteditable', 'true').text(0);
                td.on('input', function() {
                    const value = $(this).text();
                
                    if (!/^-?\d*$/.test(value)) {
                        $(this).text(value.replace(/[^-?\d]/g, ''));
                    }
                });
                td.on('focusout', function() {
                    let value = $(this).text();
                    if (value === '') {
                        value = 0;
                        $(this).text(value);
                    }
                    matrix[i][j] = parseInt(value);
                });
                tr.append(td);
            }
            tableBody.append(tr);
        }
        $('.matrix-container').show();
        $('#gaussButton').prop('disabled', false);
    }


    function addStep(description) {
        const stepItem = $('<li class="list-group-item"></li>').text(description);
        $('#stepsList').append(stepItem);
    }


    function gaussJordan(matrix, row = 0) {
        const n = matrix.length;

    
        if (row >= n) return;

    
        if (matrix[row][row] !== 1) {
            const divisor = matrix[row][row];
            if (divisor !== 0) {
                for (let j = 0; j < n; j++) {
                    matrix[row][j] = Math.round(matrix[row][j] / divisor);
                }
                addStep(`Dividir fila ${row + 1} entre ${divisor}`);
            }
        }

    
        for (let k = 0; k < n; k++) {
            if (k !== row) {
                const factor = matrix[k][row];
                for (let j = 0; j < n; j++) {
                    matrix[k][j] -= factor * matrix[row][j];
                }
                addStep(`Restar ${factor} veces la fila ${row + 1} de la fila ${k + 1}`);
            }
        }

    
        gaussJordan(matrix, row + 1);
    }


    function displayResult(matrix) {
        const resultTable = $('#resultTable');
        resultTable.empty();
        matrix.forEach(row => {
            const tr = $('<tr></tr>');
            row.forEach(value => {
                const td = $('<td></td>').text(value);
                tr.append(td);
            });
            resultTable.append(tr);
        });
        $('.result-container').show();
    }


    $('#generateMatrixBtn').on('click', function() {
        size = parseInt($('#matrixSize').val());
        $('#stepsList').empty(); 
        if (size >= 2 && size <= 5) {
            generateEditableMatrix(size);
        } else {
            alert('Por favor, ingrese un tamaño válido para la matriz (2-5).');
        }
    });


    $('#gaussButton').on('click', function() {
        const matrixCopy = matrix.map(row => row.slice());
        $('#stepsList').empty();  // Limpiar pasos anteriores
        gaussJordan(matrixCopy); 
        displayResult(matrixCopy); 
        $('.steps-container').show();
    });
});

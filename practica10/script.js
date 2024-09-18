$(document).ready(function() {
    let matrix = [];
    let size = 0;

    // Genera la matriz editable según el tamaño
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
                    // Solo permite números enteros positivos o negativos
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

    // Función para mostrar las operaciones realizadas
    function addStep(description) {
        const stepItem = $('<li class="list-group-item"></li>').text(description);
        $('#stepsList').append(stepItem);
    }

    // Aplica Gauss-Jordan para convertir la matriz en identidad utilizando recursividad
    function gaussJordan(matrix, row = 0) {
        const n = matrix.length;

        // Caso base: si hemos procesado todas las filas, terminamos
        if (row >= n) return;

        // Aseguramos que el pivote es 1 dividiendo toda la fila
        if (matrix[row][row] !== 1) {
            const divisor = matrix[row][row];
            if (divisor !== 0) {
                for (let j = 0; j < n; j++) {
                    matrix[row][j] = Math.round(matrix[row][j] / divisor);
                }
                addStep(`Dividir fila ${row + 1} entre ${divisor}`);
            }
        }

        // Convertimos los elementos por encima y por debajo de la diagonal a 0
        for (let k = 0; k < n; k++) {
            if (k !== row) {
                const factor = matrix[k][row];
                for (let j = 0; j < n; j++) {
                    matrix[k][j] -= factor * matrix[row][j];
                }
                addStep(`Restar ${factor} veces la fila ${row + 1} de la fila ${k + 1}`);
            }
        }

        // Llamada recursiva para la siguiente fila
        gaussJordan(matrix, row + 1);
    }

    // Muestra la matriz resultante después de aplicar Gauss-Jordan
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

    // Al hacer clic en "Generar Matriz"
    $('#generateMatrixBtn').on('click', function() {
        size = parseInt($('#matrixSize').val());
        $('#stepsList').empty();  // Limpiar pasos anteriores
        if (size >= 2 && size <= 5) {
            generateEditableMatrix(size);
        } else {
            alert('Por favor, ingrese un tamaño válido para la matriz (2-5).');
        }
    });

    // Al hacer clic en "Convertir en Matriz Identidad"
    $('#gaussButton').on('click', function() {
        const matrixCopy = matrix.map(row => row.slice()); // Crea una copia de la matriz
        $('#stepsList').empty();  // Limpiar pasos anteriores
        gaussJordan(matrixCopy);  // Aplicar Gauss-Jordan de manera recursiva
        displayResult(matrixCopy);  // Mostrar resultado
        $('.steps-container').show();
    });
});

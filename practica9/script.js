$(document).ready(function() {
    function getMatrixValues(tableId) {
        let matrix = [];
        $(`#${tableId} tr`).each(function() {
            let row = [];
            $(this).find('td').each(function() {
                let value = parseFloat($(this).text());
                if (isNaN(value)) value = 0;
                row.push(value);
            });
            matrix.push(row);
        });
        return matrix;
    }

    function setMatrixValues(tableId, matrix) {
        $(`#${tableId} tr`).each(function(rowIndex) {
            $(this).find('td').each(function(colIndex) {
                $(this).text(matrix[rowIndex][colIndex]);
            });
        });
    }

    function validateAndCorrectInput(tdElement) {
        let value = tdElement.text();
        if (!/^-?\d*$/.test(value)) {
            tdElement.text(value.replace(/[^-?\d]/g, ''));
        }
    }

    function handleFocusOut(tdElement) {
        let value = tdElement.text();
        if (value === '') {
            value = 0;
            tdElement.text(value);
        }
    }

    function calculateMatrices() {
        const matrix1 = getMatrixValues('matrix1Table');
        const matrix2 = getMatrixValues('matrix2Table');
        
        let sumMatrix = [];
        let subtractionMatrix = [];
        let productMatrix = [];
        let divisionMatrix = [];

        for (let i = 0; i < 2; i++) {
            let sumRow = [];
            let subtractionRow = [];
            let productRow = [];
            let divisionRow = [];

            for (let j = 0; j < 2; j++) {
                sumRow.push(matrix1[i][j] + matrix2[i][j]);
                subtractionRow.push(matrix1[i][j] - matrix2[i][j]);
                productRow.push(matrix1[i][j] * matrix2[i][j]);
                divisionRow.push(matrix2[i][j] !== 0 ? (matrix1[i][j] / matrix2[i][j]).toFixed(2) : '∞');
            }

            sumMatrix.push(sumRow);
            subtractionMatrix.push(subtractionRow);
            productMatrix.push(productRow);
            divisionMatrix.push(divisionRow);
        }

        setMatrixValues('sumTable', sumMatrix);
        setMatrixValues('subtractionTable', subtractionMatrix);
        setMatrixValues('productTable', productMatrix);
        setMatrixValues('divisionTable', divisionMatrix);
    }

    $('td').on('input', function() {
        validateAndCorrectInput($(this));
    });

    $('td').on('focusout', function() {
        handleFocusOut($(this));
    });

    $('#calculateBtn').on('click', calculateMatrices);
});

$(function ($) {
    let bufferValue = '0';
    let currentValue = 0;
    let displayData = '';
    let tmpValues = [];
    let values = [];
    let newValues = [];
    let letsCont = false;
    let updateBufferValue = (v) => {
        if (bufferValue === '0') {
            bufferValue = v.toString();
        } else {
            bufferValue += v;
        }
        $(".calculator-result").text(bufferValue);
    };
    let setBufferValue = (v) => {
        bufferValue = v.toString();
        $(".calculator-result").text(bufferValue);
    };
    let updateDisplayData = (v) => {
        displayData += v;
        $(".calculator-history").text(displayData);
    };
    let resetDisplayData = () => {
        displayData = '';
        $(".calculator-history").text('');
    };
    let checkValues = (valu) => {
        letsCont = false;
        let maxKey = valu.length;
        tmpValues = [];
        $.each(valu, (key, item) => {
            let newValue;
            if (item.op === "*") {
                if (key+1 < maxKey) {
                    newValue = item.val * valu[key+1].val;
                    tmpValues.push({"op": valu[key+1].op, "val": newValue});
                    if (valu[key+1].op === "*" || valu[key+1].op === "/") {
                        letsCont = true;
                    }
                    valu[key+1] = false;
                }
            } else if (item.op === "/") {
                if (key+1 < maxKey) {
                    newValue = item.val / valu[key+1].val;
                    tmpValues.push({"op": valu[key+1].op, "val": newValue});
                    if (valu[key+1].op === "*" || valu[key+1].op === "/") {
                        letsCont = true;
                    }
                    valu[key+1] = false;
                }
            } else {
                if (item !== false)
                    tmpValues.push(item);
            }
        });
        return tmpValues;
    }
    let checkOtherOp = (valu) => {
        letsCont = false;
        let maxKey = valu.length;
        tmpValues = [];
        $.each(valu, (key, item) => {
            let newValue;
            if (item.op === "+") {
                if (key+1 < maxKey) {
                    let v1 = item.val;
                    let v2 = valu[key+1].val;
                    newValue = parseInt(v1) + parseInt(v2);
                    tmpValues.push({"op": valu[key+1].op, "val": newValue});
                    if (valu[key+1].op === "+" || valu[key+1].op === "-" || valu[key+1].op === "%") {
                        letsCont = true;
                    }
                    valu[key+1] = false;
                }
            } else if (item.op === "-") {
                if (key+1 < maxKey) {
                    newValue = item.val - valu[key+1].val;
                    tmpValues.push({"op": valu[key+1].op, "val": newValue});
                    if (valu[key+1].op === "+" || valu[key+1].op === "-" || valu[key+1].op === "%") {
                        letsCont = true;
                    }
                    valu[key+1] = false;
                }
            } else if (item.op === '%') {
                if (key+1 < maxKey) {
                    newValue = item.val % valu[key+1].val;
                    tmpValues.push({"op": valu[key+1].op, "val": newValue});
                    if (valu[key+1].op === "+" || valu[key+1].op === "-" || valu[key+1].op === "%") {
                        letsCont = true;
                    }
                    valu[key+1] = false;
                }
            } else {
                if (item !== false)
                    tmpValues.push(item);
            }
        });
        return tmpValues;
    }
    let findTotal = () => {
        // find
        newValues = checkValues(values);
        while (letsCont) {
            newValues = checkValues(newValues);
        }
        // sum or other op.
        newValues = checkOtherOp(newValues);
        while (letsCont) {
            newValues = checkOtherOp(newValues);
        }
        resetDisplayData();
        setBufferValue(newValues[0].val);
        values = [];
    };
    $("div.calculator-button[data-type=n]").on("click", function (e) {
        let val = $(this).data("value");
        updateBufferValue(val);
    });
    $("div.calculator-button[data-type=o]").on("click", function (e) {
        let val = $(this).data("value");
        if (val === 'c') {
            $(".calculator-result").text(0);
            bufferValue = '0';
            currentValue = 0;
            resetDisplayData();
        }
        if (bufferValue === '0') {
            return -1;
        }
        switch (val) {
            case "+":
                values.push({"op": "+", "val": bufferValue});
                currentValue = parseInt(bufferValue);
                updateDisplayData(bufferValue + "+");
                bufferValue = '0';
                updateBufferValue('0');
                break;
            case "-":
                values.push({"op": "-", "val": bufferValue});
                currentValue = parseInt(bufferValue);
                updateDisplayData(bufferValue + "-");
                bufferValue = '0';
                updateBufferValue('0');
                break;
            case "*":
                values.push({"op": "*", "val": bufferValue});
                currentValue = parseInt(bufferValue);
                updateDisplayData(bufferValue + "*");
                bufferValue = '0';
                updateBufferValue('0');
                break;
            case "/":
                values.push({"op": "/", "val": bufferValue});
                currentValue = parseInt(bufferValue);
                updateDisplayData(bufferValue + "/");
                bufferValue = '0';
                updateBufferValue('0');
                break;
            case "%":
                values.push({"op": "%", "val": bufferValue});
                currentValue = parseInt(bufferValue);
                updateDisplayData(bufferValue + "%");
                bufferValue = '0';
                updateBufferValue('0');
                break;
            case "=":
                values.push({"op": "", "val": bufferValue});
                findTotal();
                break;
        }

    });
});
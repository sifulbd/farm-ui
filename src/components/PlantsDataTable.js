import React from "react";
import DataTable from "react-data-table-component";

const data = [
    { id: 1, title: "Conan the Barbarian", year: "1982" },
    { id: 2, title: "onan the Barbarian", year: "1982" },
    { id: 3, title: "an the Barbarian", year: "1982" },
    { id: 5, title: "Cnan the Barbarian", year: "1982" },
    { id: 4, title: "Con the Barbarian", year: "1982" },
    { id: 6, title: "Na the Barbarian", year: "1982" },
    { id: 7, title: "Man the Barbarian", year: "1982" },
    { id: 8, title: "Con the Barbarian", year: "1982" },
    { id: 9, title: "Cof the Barbarian", year: "1982" },
    { id: 10, title: "Kan the Barbarian", year: "1982" },
    { id: 12, title: "Bas the Barbarian", year: "2000" },
];

const columns = [
    {
        name: "flavorCode",
        selector: "flavorCode",
        sortable: true,
    },
    {
        name: "flavorName",
        selector: "flavorName",
        sortable: true,
    },
    {
        name: "isDeleteAllowed",
        selector: (row) => row["isDeleteAllowed"].toString(),
        sortable: true,
    },
    {
        name: "isEditAllowed",
        selector: (row) => row["isEditAllowed"].toString(),
        sortable: true,
    },
    {
        name: "plantCode",
        selector: "plantCode",
        sortable: true,
    },
    {
        name: "someBigIntVal",
        selector: "someBigIntVal",
        sortable: true,
    },
    {
        name: "someBitVal",
        selector: "someBitVal",
        sortable: true,
    },
    {
        name: "someDateVal",
        selector: "someDateVal",
        sortable: true,
    },
    {
        name: "someDecimalVal",
        selector: "someDecimalVal",
        sortable: true,
    },
    {
        name: "someEmailAddress",
        selector: "someEmailAddress",
        sortable: true,
    },
    {
        name: "someFloatVal",
        selector: "someFloatVal",
        sortable: true,
    },
    {
        name: "someIntVal",
        selector: "someIntVal",
        sortable: true,
    },
    {
        name: "someMoneyVal",
        selector: "someMoneyVal",
        sortable: true,
    },
    {
        name: "someNVarCharVal",
        selector: "someNVarCharVal",
        sortable: true,
    },
    {
        name: "somePhoneNumber",
        selector: "somePhoneNumber",
        sortable: true,
    },
    {
        name: "someTextVaaal",
        selector: "someTextVal",
        sortable: true,
    },
    {
        name: "someUTCDateTimeVal",
        selector: "someUTCDateTimeVal",
        sortable: true,
    },
    {
        name: "someVarCharVal",
        selector: "someVarCharVal",
        sortable: true,
    },
];

//For export as CSV
function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}
function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
}
const Export = ({ onExport }) => (
    <button
        className="btn btn-secondary"
        onClick={(e) => onExport(e.target.value)}
    >
        Export CSV
    </button>
);

const PlantsDataTable = ({ plants }) => {
    const plantList = plants && plants.items;
    const actionsMemo = React.useMemo(
        () => <Export onExport={() => downloadCSV(plantList)} />,
        []
    );

    console.log(plantList);
    return (
        <>
            <DataTable
                columns={columns}
                data={plants.items}
                pagination
                actions={actionsMemo}
            />
        </>
    );
};

export default PlantsDataTable;

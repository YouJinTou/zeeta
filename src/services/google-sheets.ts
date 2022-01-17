const { GoogleSpreadsheet } = require('google-spreadsheet');

export interface Props {
    client_email: string | undefined,
    private_key: string | undefined,
    docId: string | undefined,
};

const _props: Props = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    docId: process.env.GOOGLE_DOC_ID,
};

export const getDoc = async (props = _props) => {
    if (!props.client_email) throw "client_email missing.";
    if (!props.private_key) throw "private_key missing.";
    if (!props.docId) throw "docId missing.";
    const doc = new GoogleSpreadsheet(props.docId);
    await doc.useServiceAccountAuth({ ...props });
    await doc.loadInfo();
    return doc;
}

export const getSheet = async (sheetTitle: string, props = _props) => {
    const doc = await getDoc(props);
    const sheet = await doc.sheetsByTitle[sheetTitle];
    return sheet;
}

export const getFirst = async (sheetTitle: string, props = _props) => {
    const sheet = await getSheet(sheetTitle, props);
    const row = (await sheet.getRows())[0];
    const keyValues = rowToMap(row);
    return keyValues;
}

export const getNormalized = async (sheetTitle: string, props = _props) => {
    const sheet = await getSheet(sheetTitle, props);
    const rows = await sheet.getRows();
    const normalizedRows: {}[] = [];
    for (const r of rows) {
        const object = Object.fromEntries(rowToMap(r));
        normalizedRows.push(object);
    }
    return normalizedRows;
}

const rowToMap = (row: any) => new Map<string, string>(
    Object.keys(row)
        .filter(k => !k.startsWith('_'))
        .map(h => ([h, row[h] || ''])));

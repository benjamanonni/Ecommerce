function normalizarId(id) {
    if (/[^0-9]/.test(id)) {
        return null;
    }
    id = parseInt(id, 10);
    return id;
}
module.exports = normalizarId;
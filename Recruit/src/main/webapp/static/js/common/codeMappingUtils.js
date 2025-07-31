const codeMappingUtils = {
  findTextByCode: function(code, array, key, valueKey) {
    if (!Array.isArray(array)) return "";
    const found = array.find(item => item[key] === code);
    return found ? found[valueKey] : "";
  }
};
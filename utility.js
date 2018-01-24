define(['json!en-ca.json', 'json!fr-ca.json'], function (en, fr) {
  return {
    rannumber() {
    var rannumber = '';
    for (ranNum = 1; ranNum <= 6; ranNum++) {
        rannumber += Math.floor(Math.random() * 10).toString();
    }
    return rannumber;
}
  }
});



define(['json!en-ca.json', 'json!fr-ca.json'], function (en, fr) {
  return {
    rannumber() {
        var randnumber = '';
        for (ranNum = 1; ranNum <= 6; ranNum++) {
            randnumber += Math.floor(Math.random() * 10).toString();
        }
        return randnumber;
    }
  }
});



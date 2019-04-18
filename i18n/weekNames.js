let zh = '日,一,二,三,四,五,六';
let jp = '日,月,金,木,水,火,土';
let en = 'SU,MO,TU,WE,TH,FR,SA';


module.exports = {
  fetchWeekNames: function(lang){
    let result = null;
    switch(lang){
      case 1:
        result = jp;
        break;
      case 2:
        result = en;
        break;
      default:
        result = zh;
        break;
    }
    return result.split(',');
  }
}
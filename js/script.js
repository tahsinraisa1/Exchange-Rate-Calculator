let options='';

const rate_ID = document.getElementById('rate');
const from_currency_ID = document.getElementById('from-currency');
const from_amount_ID = document.getElementById('from-value');
const to_currency_ID = document.getElementById('to-currency');
const to_amount_ID = document.getElementById('to-value');

const convert_rate = function() {  
  const from_currency = from_currency_ID.value, to_currency = to_currency_ID.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
    .then(resolve => { return resolve.json() })
    .then(data => {

      const len = Object.keys(data.rates).length;
      const rate = data.rates[to_currency];
      
      for(const [key, value] of Object.entries(data.rates)){
       // console.log(key, value);
       if(key!==from_currency){
        options += '<option value="'+key+'">'+key+'</option>';

        from_currency_ID.insertAdjacentHTML('beforeend', options);
        options='';
       }
       if(key!==to_currency){
        options += '<option value="'+key+'">'+key+'</option>';
        to_currency_ID.insertAdjacentHTML('beforeend', options);
        options='';
       }
      }
      to_amount_ID.innerHTML = (from_amount_ID.value * rate).toFixed(3);

      rate_ID.textContent = `1 ${from_currency} = ${rate} ${to_currency}`;

    })
    .catch(error => alert(error));

}
convert_rate();

from_currency_ID.addEventListener('change', convert_rate);
to_currency_ID.addEventListener('change', convert_rate);
from_amount_ID.addEventListener('input', convert_rate);



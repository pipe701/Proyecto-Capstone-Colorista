const create = str => document.createElement(str);
const files = document.querySelectorAll('.fancy-file');
Array.from(files).forEach(
    f => {
        const label = create('label');
        const span_text = create('span');
        const span_name =create('span');

        label.htmlFor = f.id;

        span_text.className = 'fancy-file__fancy-file-name';
       

        span_text.appendChild(span_name);
        f.parentNode.appendChild(label);

        span_name.style.width = (span_text.clientWidth - 20)+'px';

        f.addEventListener('change', e => {
            if( f.files.length == 0 ){
                span_name.innerHTML = f.dataset.empty ||'Ningún archivo seleccionado';
            }else if( f.files.length > 1 ){
                span_name.innerHTML = f.files.length + ' archivos seleccionados';
            }else{
                span_name.innerHTML = f.files[0].name;
            }
        } );   
    }
);
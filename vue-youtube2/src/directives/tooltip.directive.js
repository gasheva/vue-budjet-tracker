import M from 'materialize-css'
// при наведении на элемент высвечивается подсказка 
export default{
    bind(el, {value}){
        M.Tooltip.init(el, {html: value})
    },
    unbind(el){
        const tooltip = M.Tooltip.getInstance(el);
        if(tooltip && tooltip.destroy)
            tooltip.destroy();
    }
}
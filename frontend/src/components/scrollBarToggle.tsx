export default function scrollBarToggle(isScrollingEnabled: boolean) {
        if(typeof window === 'undefined') return
        const body = document.body
        if(!isScrollingEnabled){
            body.style.height = "100%"
            body.style.overflowY = "hidden"
        }
        else{
            body.style.height = "revert"
            body.style.overflowY = "auto"
        }
}

import './index.css'
import Whatsapp from '../Whatsapp'
const Footer=()=>{
    return(
        <div class="footer-section pt-5 pb-5">
<div class="container">
    <div class="row">
        <div class="col-12 text-center">
            <img src="https://res.cloudinary.com/dohbfsl9b/image/upload/v1730173560/idtekcs/logo_a8fyqi.webp" class="logo" />
            <h1 class="footer-section-mail-id">ididtekcs@gmail.com</h1>
            <p class="footer-section-address">
                Hyderbad
            </p>
            <Whatsapp/>
        </div>
    </div>
</div>
</div>
    )
}
export default Footer
import BgGradient1 from "../assets/images/backgroup-secsion/bg-gradient1.png";
import BgGradient2 from "../assets/images/backgroup-secsion/bg-gradient2.png";
import BgGradient3 from "../assets/images/backgroup-secsion/bg-gradient3.png";
import ImgSliderhome2 from "../assets/images/backgroup-secsion/img-bg-sliderhome2.png";
import ImgSliderhome3 from "../assets/images/backgroup-secsion/img-bg-sliderhome3.png";
import ImgSlider2 from "../assets/images/box-item/imgslider2.png";
import ImgSlider3 from "../assets/images/box-item/imgslider-3.png";



function Header() {
    return (
        <section className="flat-title-page style2">
            <img className="bgr-gradient gradient1" src={BgGradient1} alt=""/>
                <img className="bgr-gradient gradient2" src={BgGradient2} alt="" />
                    <img className="bgr-gradient gradient3" src={BgGradient3}
                         alt="" />
                        <div className="shape item-w-16"></div>
                        <div className="shape item-w-22"></div>
                        <div className="shape item-w-32"></div>
                        <div className="shape item-w-48"></div>
                        <div className="shape style2 item-w-51"></div>
                        <div className="shape style2 item-w-51 position2"></div>
                        <div className="shape item-w-68"></div>
                        <div className="overlay"></div>
                        <div className="swiper-container mainslider home auctions">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="slider-item">
                                        <div className="themesflat-container ">
                                            <div className="wrap-heading flat-slider flex">
                                                <div className="content">
                                                    <h2 className="heading">Discover, find,
                                                    </h2>
                                                    <h1 className="heading mb-style"><span className="tf-text s1">Sell extraordinary</span>
                                                    </h1>
                                                    <h1 className="heading">Monster NFTs</h1>
                                                    <p className="sub-heading mg-t-29 mg-bt-44">Marketplace for monster
                                                        character cllections non fungible token NFTs
                                                    </p>
                                                    <div className="flat-bt-slider flex style2">
                                                        <a
                                                           className="sc-button header-slider style style-1 rocket fl-button pri-1"><span>Explore
                                                </span></a>
                                                        <a
                                                           className="sc-button header-slider style style-1 note fl-button pri-1"><span>Create
                                                </span></a>
                                                    </div>
                                                </div>
                                                <div className="image">
                                                    <img className="img-bg"
                                                         src={ImgSliderhome2}
                                                         alt="Image" />
                                                        <img src={ImgSlider2} alt="Image" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="swiper-slide">
                                    <div className="slider-item">
                                        <div className="themesflat-container">
                                            <div className="wrap-heading flat-slider text-center two">
                                                <h2 className="heading">Discover, and collect
                                                </h2>
                                                <h1 className="heading"><span
                                                    className="tf-text s1">extraordinary</span>
                                                    <span>Monster NFTs</span>
                                                </h1>
                                                <p className="sub-heading mg-t-29 mg-bt-50">Marketplace for monster
                                                    character cllections non fungible token NFTs
                                                </p>
                                                <div className="flat-bt-slider flex">
                                                    <a
                                                       className="sc-button header-slider style style-1 rocket fl-button pri-1"><span>Explore
                                            </span></a>
                                                    <a
                                                       className="sc-button header-slider style style-1 note fl-button pri-1"><span>Create
                                            </span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="swiper-slide">
                                    <div className="slider-item">
                                        <div className="themesflat-container flex">
                                            <div className="image three">
                                                <img src={ImgSlider3} alt="Image"/>
                                                    <img className="img-bg"
                                                         src={ImgSliderhome3}
                                                         alt="Image"/>
                                            </div>
                                            <div className="wrap-heading flat-slider h3 three">
                                                <h2 className="heading">Discover, and collect
                                                </h2>
                                                <h2 className="heading">extraordinary</h2>
                                                <h2 className="heading h3"><span className="fill">Monster </span>NFTs
                                                </h2>
                                                <p className="sub-heading mt-29 mb-35">Marketplace for monster character
                                                    cllections non fungible token NFTs
                                                </p>
                                                <div className="flat-bt-slider flex style2">
                                                    <a
                                                       className="sc-button header-slider style style-1 rocket fl-button pri-1"><span>Explore
                                            </span></a>
                                                    <a
                                                       className="sc-button header-slider style style-1 note fl-button pri-1"><span>Create
                                            </span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <div className="swiper-button-next btn-slide-next active"></div>
                        <div className="swiper-button-prev btn-slide-prev"></div>
        </section>
    )
}

export default Header
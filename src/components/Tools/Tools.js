import React, { useEffect, useRef } from "react";
import styled, {css} from "styled-components";
import html2canvas from 'html2canvas';
import ReactTooltip from "react-tooltip";

import ImageUploading from 'react-images-uploading';
import {NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BsCheck, BsNutFill } from 'react-icons/bs';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { TbAlignLeft } from 'react-icons/tb';
import { FaTimes } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineStop } from 'react-icons/ai';
import { MdOutlineDescription } from 'react-icons/md';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

import { MarkImg, MarkHoverImg, RazorbackImg, RazorbackSelectImg, NoImg } from "../../assets/images";

import { Design } from "../../assets/images/main_assets/1-DESIGN/DesignImage";
import { Abxy } from "../../assets/images/main_assets/2-ABXY/AbxyImage";
import { Dpad } from "../../assets/images/main_assets/3-Dpad/DpadImage";
import { ThumbL } from "../../assets/images/main_assets/4-THUMBSTICK L/ThumbL";
import { ThumbR } from "../../assets/images/main_assets/5-THUMBSTICK R/ThumbR";
import { StartBtn } from "../../assets/images/main_assets/6-START BACK/StartBtn";
import { Touchpad } from "../../assets/images/main_assets/7-TOUCHPAD/Touchpad";
import { Trim } from "../../assets/images/main_assets/8-TRIM/Trims";
import { Trigger } from "../../assets/images/main_assets/9-TRIGGERS/Triggers";
import { RearDesign } from "../../assets/images/main_assets/10-REAR DESIGN/RearDesign";
import { Paddle } from "../../assets/images/main_assets/paddle/Paddle";

import { DominL } from "../../assets/images/main_assets/L Domin8or Button/DominL";
import { DominR } from "../../assets/images/main_assets/R Domin8or Button/DominR";
import { DominSelection } from "../../assets/images/main_assets/L Domin8or Button/DominL";
import { CateImgs, PaddleImg, DominLimg, DominRImg, TextImg, DTriggerImg } from "../../assets/images/main_assets/cateImg/cate";

import AppContext from "../../context/context";
import "swiper/css";

const Tools = () => {
  

  const font_zoom = [0.7, 0.7, 1, 0.7, 0.7, 0.7];
  const [font_size, setFontSize] = React.useState(0);
  
  const [RearDesigntabSelect, RearDesignSetTabSelect] = React.useState(0);
  const [PaddletabSelect, PaddleSetTabSelect] = React.useState(0);
  
  const middRef = useRef();

  const [menuFlag, setMenuFlag] = React.useState(false);

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.getElementById('viewer'));
    const dataURL = canvas.toDataURL('image/png');
    // downloadjs(dataURL, 'download.png', 'image/png');
  };
  
  const myContext = React.useContext(AppContext);

  const swiperTo = (ind) => {
    myContext.setSnapIndex(ind);
    myContext.swiper.slideTo(ind, 300);
  }

  const swiperNext = () => {
    if (myContext.snapIndex >= 17) {
      myContext.setIsFinished(true);
    } else {
      myContext.snapIndex === 10 && myContext.paddle !== null ? swiperTo(myContext.snapIndex+2) : myContext.swiper.slideNext();
    }
  }
  
  const swiperPrev = () => {
    myContext.setIsFinished(false);
    myContext.snapIndex === 12 && myContext.paddle !== null ? swiperTo(myContext.snapIndex-2) : myContext.swiper.slidePrev();
  }

  useEffect(() => {
    // console.log(myContext.design);
    setFontSize(30 / font_zoom[myContext.familyId]);
  }, [])

  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    const temp = imageList[0].file;
    // if (!(temp.type === 'image/png' || temp.type === 'image/jpeg' || temp.type === 'image/gif')) {
    //   NotificationManager.warning('Only support png, jpeg and svg files', "Warning");
    //   return;
    // } else if (temp.size / 1024 / 1014 > 2) {
    //   NotificationManager.warning('The image must be 2M.', "Warning");
    //   return;
    // }
    myContext.setImages(imageList);
    myContext.setImgStatus(true);
  };

  async function AddToCart() {
    let quote_id;
    await fetch(`https://game-server-deploy.herokuapp.com/get_quote_id`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(async (response) => console.log(quote_id = await response.text()));
    console.log(myContext.razorBack);
    console.log(myContext.razorBackData);
    let totalData = {
      cartItem: {
        sku: "byops5",
        qty: 1,
        quoteId: quote_id,
        productOption: {
          extensionAttributes: {
            customOptions: [
              {
                optionId: myContext.designData.option_id,
                optionValue: myContext.designData.steps[myContext.design[0]].option_type_id
              },
              {
                optionId: myContext.designData.items[myContext.design[0]][myContext.design[1]].option_id,
                optionValue: myContext.designData.items[myContext.design[0]][myContext.design[1]].option_type_id,
              },
              {
                optionId: myContext.abxyData.option_id,
                optionValue: myContext.abxyData.steps[myContext.abxy[0]].option_type_id
              },
              {
                optionId: myContext.abxyData.items[myContext.abxy[0]][myContext.abxy[1]].option_id,
                optionValue: myContext.abxyData.items[myContext.abxy[0]][myContext.abxy[1]].option_type_id,
              },
              {
                optionId: myContext.dpadData.option_id,
                optionValue: myContext.dpadData.steps[myContext.dpad[0]].option_type_id
              },
              {
                optionId: myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].option_id,
                optionValue: myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].option_type_id,
              },
              {
                optionId: myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].option_id,
                optionValue: myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].option_type_id
              },
              {
                optionId: myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].option_id,
                optionValue: myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].option_type_id
              },
              {
                optionId: myContext.startBackData.option_id,
                optionValue: myContext.startBackData.steps[myContext.startBtn[0]].option_type_id
              },
              {
                optionId: myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].option_id,
                optionValue: myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].option_type_id,
              },
              {
                optionId: myContext.thuchPadData.option_id,
                optionValue: myContext.thuchPadData.steps[myContext.touchpad[0]].option_type_id
              },
              {
                optionId: myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].option_id,
                optionValue: myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].option_type_id,
              },
              {
                optionId: myContext.trimData.option_id,
                optionValue: myContext.trimData.steps[myContext.trim[0]].option_type_id
              },
              {
                optionId: myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].option_id,
                optionValue: myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].option_type_id,
              },
              {
                optionId: myContext.triggersData.option_id,
                optionValue: myContext.triggersData.steps[myContext.trigger[0]].option_type_id
              },
              {
                optionId: myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].option_id,
                optionValue: myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].option_type_id,
              },
              {
                optionId: myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].option_id,
                optionValue: myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].option_type_id,
              },
              {
                optionId: "1862",
                optionValue: "5988"
              }
            ]
          }
        }
      }
    }

    // ! Razorback options
    if (myContext.razorBack) {
      totalData.cartItem.productOption.extensionAttributes.customOptions.push(
        {
          optionId: myContext.razorBackData.option_id,
          optionValue: myContext.razorBackData.option_type_id
        }
      )
    }

    // ! Esports 
    // console.log('--------------------------------------------------');
    // console.log(myContext.paddle);
    // console.log(myContext.lrdomin);
    if (myContext.paddle == null && !myContext.lrdomin) {
      console.log('---- 1 ----');
      totalData.cartItem.productOption.extensionAttributes.customOptions.push(
        {
          optionId: myContext.esportsData.option_id,
          optionValue: myContext.esportsData.values[0].option_type_id
        }
      )
    } else if (myContext.paddle != null && !myContext.lrdomin) {
      totalData.cartItem.productOption.extensionAttributes.customOptions.push(
        {
          optionId: myContext.esportsData.option_id,
          optionValue: myContext.esportsData.values[0].option_type_id
        }
      )
      // totalData.cartItem.productOption.extensionAttributes.customOptions.push(
      //   {
      //     optionId: myContext.esportsData.option_id,
      //     optionValue: myContext.esportsData.values[1].option_type_id
      //   }
      // )
    } else if (myContext.paddle == null && myContext.lrdomin) {
      console.log('---- 3 ----');
      totalData.cartItem.productOption.extensionAttributes.customOptions.push(
        {
          optionId: myContext.esportsData.option_id,
          optionValue: myContext.esportsData.values[2].option_type_id
        }
      )
    }

    console.log(totalData);

    // ! D triggers 
    if (!myContext.digital_trigger) {
      totalData.cartItem.productOption.extensionAttributes.customOptions.push(
        {
          optionId: myContext.dtriggersData.option_id,
          optionValue: myContext.dtriggersData.option_type_id1
        }
      )
    } else {
      totalData.cartItem.productOption.extensionAttributes.customOptions.push(
        {
          optionId: myContext.dtriggersData.option_id,
          optionValue: myContext.dtriggersData.option_type_id2
        }
      )
    }
    console.log('--------------------');
    console.log(totalData);
    // const res = await axios.post('https://game-server-deploy.herokuapp.com/add_product', totalData);
    window.location.href = 'https://controllermodz.co.uk/checkout/cart/';
  }


  return (
    <Wrapper>
      <NotificationContainer/>
      <Menu mf={menuFlag}>
        <Remove onClick={() => setMenuFlag(false)}>
          <span><FaTimes /></span>
        </Remove>
        <MenuBody>
          {/* {
            CateImgs.map((item, index) => (
            ))
          } */}
          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(0); }} me={0} curr={myContext.snapIndex} stat={myContext.design === null ? false : true}>
            <img alt="no img" src={CateImgs[0].image} style={{transform: `scale(${CateImgs[0].zoom})`}} ></img>
            {
              myContext.designData ? myContext.designData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(1); }} me={1} curr={myContext.snapIndex} stat={myContext.abxy === null ? false : true}>
            <img alt="no img" src={CateImgs[1].image} style={{transform: `scale(${CateImgs[1].zoom})`}} ></img>
            {
              myContext.abxyData ? myContext.abxyData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(2); }} me={2} curr={myContext.snapIndex} stat={myContext.dpad === null ? false : true}>
            <img alt="no img" src={CateImgs[2].image}  style={{transform: `scale(${CateImgs[2].zoom})`}} ></img>
            {
              myContext.dpadData ? myContext.dpadData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(3); }} me={3} curr={myContext.snapIndex} stat={myContext.thumbstickL === null ? false : true}>
            <img alt="no img" src={CateImgs[3].image}  style={{transform: `scale(${CateImgs[3].zoom})`}} ></img>
            {
              myContext.thubmLData ? myContext.thubmLData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(4); }} me={4} curr={myContext.snapIndex} stat={myContext.thumbstickR === null ? false : true}>
            <img alt="no img" src={CateImgs[4].image}  style={{transform: `scale(${CateImgs[4].zoom})`}} ></img>
            {
              myContext.thubmRData ? myContext.thubmRData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(5); }} me={5} curr={myContext.snapIndex} stat={myContext.startBtn === null ? false : true}>
            <img alt="no img" src={CateImgs[5].image}  style={{transform: `scale(${CateImgs[5].zoom})`}} ></img>
            {
              myContext.startBackData ? myContext.startBackData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(6); }} me={6} curr={myContext.snapIndex} stat={myContext.touchpad === null ? false : true}>
            <img alt="no img" src={CateImgs[6].image}  style={{transform: `scale(${CateImgs[6].zoom})`}} ></img>
            {
              myContext.thuchPadData ? myContext.thuchPadData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(7); }} me={7} curr={myContext.snapIndex} stat={myContext.trim === null ? false : true}>
            <img alt="no img" src={CateImgs[7].image}  style={{transform: `scale(${CateImgs[7].zoom})`}} ></img>
            {
              myContext.trimData ? myContext.trimData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(8); }} me={8} curr={myContext.snapIndex} stat={myContext.trigger === null ? false : true}>
            <img alt="no img" src={CateImgs[8].image}  style={{transform: `scale(${CateImgs[8].zoom})`}} ></img>
            {
              myContext.triggersData ? myContext.triggersData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(9); }} me={9} curr={myContext.snapIndex} stat={myContext.rearDesign === null ? false : true}>
            <img alt="no img" src={CateImgs[9].image}  style={{transform: `scale(${CateImgs[9].zoom})`}} ></img>
            {
              myContext.razorBackData ? myContext.razorBackData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(10); }} me={10} curr={myContext.snapIndex} stat={myContext.razorBack}>
            <img alt="no img" src={CateImgs[10].image}  style={{transform: `scale(${CateImgs[10].zoom})`}} ></img>
            {
              myContext.esportsData ? myContext.esportsData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(11); }} me={11} curr={myContext.snapIndex} stat={myContext.paddle !== null ? true : false}>
            <img alt="no img" src={CateImgs[11].image}  style={{transform: `scale(${CateImgs[11].zoom})`}} ></img>
            {
              myContext.rearDesignData ? myContext.rearDesignData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(12); }} me={12} curr={myContext.snapIndex} stat={myContext.ldomin_2 !== null ? true : false}>
            <img alt="no img" src={CateImgs[12].image}  style={{transform: `scale(${CateImgs[12].zoom})`}} ></img>
            {
              myContext.dtriggersData ? myContext.dtriggersData.name : ''
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(13); }} me={13} curr={myContext.snapIndex} stat={myContext.rdomin_2 !== null ? true : false}>
            <img alt="no img" src={CateImgs[13].image} style={{transform: `scale(${CateImgs[13].zoom})`}} ></img>
            {
              myContext.textandlogoData ? myContext.textandlogoData.name : null
            }
            <SBsCheck></SBsCheck>
          </MenuItem>

          <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(14); }} me={14} curr={myContext.snapIndex} stat={myContext.digital_trigger}>
            <img alt="no img" src={CateImgs[14].image}  style={{transform: `scale(${CateImgs[14].zoom})`}} ></img>
            {CateImgs[14].name}
            <SBsCheck></SBsCheck>
          </MenuItem>

          {/* <MenuItem onClick={async () => { await setMenuFlag(false); await swiperTo(15); }} me={15} curr={myContext.snapIndex} stat={myContext.isText}>
            <img alt="no img" src={CateImgs[15].image}></img>
            {CateImgs[15].name}
            <SBsCheck></SBsCheck>
          </MenuItem> */}

        </MenuBody>
      </Menu>
      <TopDiv>
        <div>
          <progress id="file" max = {CateImgs.length} value = {myContext.snapIndex+1}></progress>
        </div>
        <div>
          <div>
            <img alt="no img" src={CateImgs[myContext.snapIndex].image} style={{transform: `scale(${CateImgs[myContext.snapIndex].zoom + 0.4})`}}></img>
            <span>
              <span>{CateImgs[myContext.snapIndex].name}</span>
              {/** Design */}
              {
                myContext.snapIndex === 0 && (myContext.designData !== []) ? (
                  <MobileSelector onChange={(e) => myContext.DesignSetTabSelect(e.target.value)}>
                    {
                      // Design.steps.map((item, index) => 
                      myContext.designData !== null ? 
                        myContext.designData.steps.map((item, index) => 
                          <option key={index} value={index}>
                            { item.name }
                          </option>
                        )
                      : null
                    }
                  </MobileSelector> 
                ): null
              }
              {/** Abxy */}
              {
                myContext.snapIndex === 1 ? (
                  <MobileSelector onChange={(e) => myContext.AbxySetTabSelect(e.target.value)}>
                    {
                      myContext.abxyData.steps.map((item, index) => 
                        <option key={index} value={index}>
                          { item.name }
                        </option>
                      )
                    }
                  </MobileSelector> 
                ): null
              }

              {/** Dpad */}
              {
                myContext.snapIndex === 2 ? (
                  <MobileSelector onChange={(e) => myContext.DpadSetTabSelect(e.target.value)}>
                    {
                      myContext.dpadData.steps.map((item, index) => 
                        <option key={index} value={index}>
                          { item.name }
                        </option>
                      )
                    }
                  </MobileSelector> 
                ): null
              }

              {/** Start Back */}
              {
                myContext.snapIndex === 5 ? (
                  <MobileSelector onChange={(e) => myContext.StartBtnSetTabSelect(e.target.value)}>
                    {
                      myContext.startBackData.steps.map((item, index) => 
                        <option key={index} value={index}>
                          { item.name }
                        </option>
                      )
                    }
                  </MobileSelector> 
                ): null
              }
              {/** Touchpad */}
              {
                myContext.snapIndex === 6 ? (
                  <MobileSelector onChange={(e) => myContext.TouchpadSetTabSelect(e.target.value)}>
                    {
                      myContext.dpadData.steps.map((item, index) => 
                        <option key={index} value={index}>
                          { item.name }
                        </option>
                      )
                    }
                  </MobileSelector> 
                ): null
              }

              {/** Touchpad */}
              {
                myContext.snapIndex === 8 ? (
                  <MobileSelector onChange={(e) => myContext.TriggerSetTabSelect(e.target.value)}>
                    {
                      myContext.dpadData.steps.map((item, index) => 
                        <option key={index} value={index}>
                          { item.name }
                        </option>
                      )
                    }
                  </MobileSelector> 
                ): null
              }
            </span>
          </div>
          <div>
            <span>
              {/* <MdOutlineDescription onClick={() => myContext.setModalDesc(true)}></MdOutlineDescription> */}
              <img alt="tooltip icon" onClick={() => myContext.setModalDesc(true)}></img>
            </span>
            <span onClick={() => setMenuFlag(!menuFlag)}>
              <TbAlignLeft></TbAlignLeft>
            </span>
            <span className="prev" onClick={() => swiperPrev()}>
              <BsChevronLeft></BsChevronLeft>
            </span>
            <span className="next" onClick={() => swiperNext()}>
              <BsChevronRight></BsChevronRight>
            </span>
          </div>
          {/* <DescTooltip>
            <h4>
              {
                myContext.snapIndex === 0 && myContext.designData !== null ? myContext.designData.items[myContext.design[0]][myContext.design[1]].desc : null
              }
              {
                myContext.snapIndex === 1 && myContext.abxyData !== null ? myContext.abxyData.items[myContext.abxy[0]][myContext.abxy[1]].desc : null                    
              }
              {
                myContext.snapIndex === 2 && myContext.dpadData !== null ? myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].desc : null                    
              }
              {
                myContext.snapIndex === 3 && myContext.thubmLData !== null ? myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].desc : null                    
              }
              {
                myContext.snapIndex === 4 && myContext.thubmRData !== null ? myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].desc : null
              }
              {
                myContext.snapIndex === 5 && myContext.startBackData !== null ? myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].desc : null                    
              }
              {
                myContext.snapIndex === 6 && myContext.thuchPadData !== null ? myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].desc : null                    
              }
              {
                myContext.snapIndex === 7 && myContext.trimData !== null ? myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].desc : null
              }
              {
                myContext.snapIndex === 8 && myContext.triggersData !== null ? myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].desc : null                    
              }
              {
                myContext.snapIndex === 9 && myContext.razorBackData !== null && myContext.razorBack ? myContext.razorBackData.desc : null
              }
              {
                myContext.snapIndex === 10 && myContext.esportsData !== null ? myContext.esportsData.values[myContext.esportsFlag].desc : null
              }
              {
                myContext.snapIndex === 11 && myContext.rearDesignData !== null ? myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].desc : null
              }
            </h4>
          </DescTooltip> */}
        </div>
      </TopDiv>


      {/**
       * ------------------------------------------------- Error Area ------------------------------------------------- 
       */}

      
      <MediumDiv ref = { middRef }>
        <Swiper
          onSwiper={s=>{
            myContext.setSwiper(s)
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          simulateTouch={false}
          scrollbar={{ draggable: true }}
          allowTouchMove={false}
          onSlideChange={async (event) => {
            const ind = event.snapIndex;
            await myContext.setSnapIndex(ind);
            middRef.current.scrollTop = 0;
            if (ind === 8 || ind === 9 || ind === 10 || ind === 11 || ind === 12) {
              await myContext.setSideflag(false);
            } else {
              await  myContext.setSideflag(true);
            }
          }}
        >
          {/* 
             ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗
             ██╔══██╗██╔════╝██╔════╝██║██╔════╝ ████╗  ██║
             ██║  ██║█████╗  ███████╗██║██║  ███╗██╔██╗ ██║
             ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║
             ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║
             ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
          */}
            <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}} id="design">
              <TopItems>
                {
                  myContext.designData !== null ?
                    myContext.designData.steps.map((item, index) => (
                    (() => {                      
                      return (
                        <TapItem key={index} keys = {index} w = { myContext.designData.steps.length } active={myContext.DesigntabSelect} onClick = {() => {
                            myContext.DesignSetTabSelect(index);
                          }}>
                            <span>
                              { item.name }
                            </span>
                            {/* <span>  
                              £{ item.price }
                            </span> */}
                            <div></div>
                          </TapItem>
                        )
                    })()
                  ))
                    : null
                }
              </TopItems>
              <Hr></Hr>
              <Selector id="design_topitems">
                {
                  myContext.designData !== null ?
                    myContext.designData.items[myContext.DesigntabSelect].map((item, index) => (
                      <SelectItemPrice title={item.name}>
                        <SelectItem
                          bgImg={item.selet}
                          key={index}
                          now = { myContext.design === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.design[0] + myContext.design[1]}
                          me = { 10000 * myContext.snapIndex + 100 * myContext.DesigntabSelect + index }
                          onClick={() => myContext.setDesign([myContext.DesigntabSelect, index])}
                          onMouseOver={async () => await myContext.setHoverImg(item.image)}
                          onMouseLeave={async () => await myContext.setHoverImg(null)}
                        >
                        </SelectItem>
                        {
                          '£'+item.price
                        }
                      </SelectItemPrice>
                    )) : null
                }
              </Selector>
            </SwiperSlide>
          {/*
               █████╗ ██████╗ ██╗  ██╗██╗   ██╗
              ██╔══██╗██╔══██╗╚██╗██╔╝╚██╗ ██╔╝
              ███████║██████╔╝ ╚███╔╝  ╚████╔╝ 
              ██╔══██║██╔══██╗ ██╔██╗   ╚██╔╝  
              ██║  ██║██████╔╝██╔╝ ██╗   ██║   
              ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   
          */}
          <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
            <TopItems>
              {
                myContext.abxyData !== null ?
                myContext.abxyData.steps.map((item, index) => (
                  (() => {
                    return (
                      <TapItem key={index} keys = {index} w = { myContext.abxyData.steps.length } active={myContext.AbxytabSelect} onClick = { () => myContext.AbxySetTabSelect(index) }>
                        <span>
                          {item.name}
                        </span>
                        {/* <span>
                          £{item.price}
                        </span> */}
                        <div></div>
                      </TapItem>
                      )
                      if (item.is_default) myContext.DesignSetTabSelect(index);
                  })()
                ))
                  : null
              }
            </TopItems>
            <Hr></Hr>
            <Selector>
              {
                myContext.abxyData !== null ?
                  myContext.abxyData.items[myContext.AbxytabSelect].map((item, index) => (
                    <SelectItemPrice>
                      <SelectItem 
                        bgImg={item.selet}
                        now = { myContext.abxy === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.abxy[0] + myContext.abxy[1]}
                        me = { 10000 * myContext.snapIndex + 100 * myContext.AbxytabSelect + index }
                        onClick={() => myContext.setAbxy([myContext.AbxytabSelect, index])}
                        onMouseOver={() => myContext.setHoverImg(item.image)}
                        onMouseLeave={() => myContext.setHoverImg(null)}
                      />
                      {
                        '£'+item.price
                      }
                    </SelectItemPrice>
                  )) : null
              }
            </Selector>
          </SwiperSlide>
          
          {/*
              ██████╗ ██████╗  █████╗ ██████╗ 
              ██╔══██╗██╔══██╗██╔══██╗██╔══██╗
              ██║  ██║██████╔╝███████║██║  ██║
              ██║  ██║██╔═══╝ ██╔══██║██║  ██║
              ██████╔╝██║     ██║  ██║██████╔╝
              ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═════╝ 
          */}

          <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
            <TopItems>
              {
                myContext.dpadData != null ?
                  myContext.dpadData.steps.map((item, index) => (
                    <TapItem key={ index } keys = { index } w = { myContext.dpadData.steps.length } active={myContext.DpadtabSelect} onClick = {() => myContext.DpadSetTabSelect(index)}>
                      <span>
                        {item.name}
                      </span>
                      {/* <span>
                        £{item.price}
                      </span> */}
                      <div></div>
                    </TapItem>
                  ))
                : BsNutFill
              }
            </TopItems>
            <Hr></Hr>
            <Selector>
              {
                myContext.dpadData != null ?
                  myContext.dpadData.items[myContext.DpadtabSelect].map((item, index) => (
                    <SelectItemPrice>
                      <SelectItem
                        bgImg={item.selet}
                        key={index}
                        now = { myContext.dpad === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.dpad[0] + myContext.dpad[1]}
                        me = { 10000 * myContext.snapIndex + 100 * myContext.DpadtabSelect + index }
                        onClick={() => myContext.setDpad([myContext.DpadtabSelect, index])}
                        onMouseOver={() => myContext.setHoverImg(item.image)}
                        onMouseLeave={() => myContext.setHoverImg(null)}
                      >
                      </SelectItem>
                      {
                        '£'+item.price
                      }
                    </SelectItemPrice>
                  ))
                : null
              }
            </Selector>
          </SwiperSlide>

          {/*
            ████████╗██╗  ██╗██╗   ██╗███╗   ███╗██████╗     ██╗     
            ╚══██╔══╝██║  ██║██║   ██║████╗ ████║██╔══██╗    ██║     
               ██║   ███████║██║   ██║██╔████╔██║██████╔╝    ██║     
               ██║   ██╔══██║██║   ██║██║╚██╔╝██║██╔══██╗    ██║     
               ██║   ██║  ██║╚██████╔╝██║ ╚═╝ ██║██████╔╝    ███████╗
               ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝     ╚══════╝
          */}
          <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
            <Hr></Hr>
            <Selector>
              {
                myContext.thubmLData != null ?
                  myContext.thubmLData.items[myContext.ThumbLtabSelect].map((item, index) => (
                    <SelectItemPrice>
                      <SelectItem
                        bgImg={item.selet}
                        key={index}
                        now = { myContext.thumbstickL === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.thumbstickL[0] + myContext.thumbstickL[1]}
                        me = { 10000 * myContext.snapIndex + 100 * myContext.ThumbLtabSelect + index }
                        onClick={() => myContext.setThumbstickL([myContext.ThumbLtabSelect, index])}
                        onMouseOver={() => myContext.setHoverImg(item.image)}
                        onMouseLeave={() => myContext.setHoverImg(null)}
                      >
                      </SelectItem>
                      {
                        '£'+item.price
                      }
                    </SelectItemPrice>
                  ))
                : null
              }
            </Selector>
          </SwiperSlide>

          {/**
           * ████████╗██╗  ██╗██╗   ██╗███╗   ███╗██████╗     ██████╗ 
             ╚══██╔══╝██║  ██║██║   ██║████╗ ████║██╔══██╗    ██╔══██╗
                ██║   ███████║██║   ██║██╔████╔██║██████╔╝    ██████╔╝
                ██║   ██╔══██║██║   ██║██║╚██╔╝██║██╔══██╗    ██╔══██╗
                ██║   ██║  ██║╚██████╔╝██║ ╚═╝ ██║██████╔╝    ██║  ██║
                ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝     ╚═╝  ╚═╝
           */}
            <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Hr></Hr>
              <Selector>
                {
                  myContext.thubmRData != null ? 
                    myContext.thubmRData.items[myContext.ThumbRtabSelect].map((item, index) => (
                      <SelectItemPrice>
                        <SelectItem 
                          bgImg={item.selet}
                          key={index}
                          now = { myContext.thumbstickR === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.thumbstickR[0] + myContext.thumbstickR[1]}
                          me = { 10000 * myContext.snapIndex + 100 * myContext.ThumbRtabSelect + index }
                          onClick={() => myContext.setThumbstickR([myContext.ThumbRtabSelect, index])} 
                          onMouseOver={() => myContext.setHoverImg(item.image)}
                          onMouseLeave={() => myContext.setHoverImg(null)}
                        />
                        {
                          '£'+item.price
                        }
                      </SelectItemPrice>
                    ))
                  : null
                }
              </Selector>
            </SwiperSlide>

            {/**
             * ███████╗████████╗ █████╗ ██████╗ ████████╗    ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗
               ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║
               ███████╗   ██║   ███████║██████╔╝   ██║       ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║
               ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║
               ███████║   ██║   ██║  ██║██║  ██║   ██║       ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║
               ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
             */}
             <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <TopItems>
                  {
                    myContext.startBackData != null ?
                      myContext.startBackData.steps.map((item, index) => (
                        <TapItem w={myContext.startBackData.steps.length} key={ index } keys = { index } active={myContext.StartBtntabSelect} onClick = {() => myContext.StartBtnSetTabSelect(index)}>
                          <span>
                            {item.name}
                          </span>
                          {/* <span>
                            £{item.price}
                          </span> */}
                          <div></div>
                        </TapItem>
                      ))
                    : null
                  }
                </TopItems>
                <Hr></Hr>
                <Selector>
                  {
                    myContext.startBackData != null ?
                      myContext.startBackData.items[myContext.StartBtntabSelect].map((item, index) => (
                        <SelectItemPrice>
                          <SelectItem 
                            key={index} 
                            bgImg={item.selet} 
                            now = { myContext.startBtn === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.startBtn[0] + myContext.startBtn[1]}
                            me = { 10000 * myContext.snapIndex + 100 * myContext.StartBtntabSelect + index }
                            onClick={() => myContext.setStartBtn([myContext.StartBtntabSelect, index])}
                            onMouseOver={() => myContext.setHoverImg(item.image)}
                            onMouseLeave={() => myContext.setHoverImg(null)}
                          ></SelectItem>
                          {
                            '£'+item.price
                          }
                        </SelectItemPrice>
                      ))
                    : null
                  }
                </Selector>
            </SwiperSlide>

            {/**
             * ████████╗ ██████╗ ██╗   ██╗ ██████╗██╗  ██╗██████╗  █████╗ ██████╗ 
               ╚══██╔══╝██╔═══██╗██║   ██║██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗
                  ██║   ██║   ██║██║   ██║██║     ███████║██████╔╝███████║██║  ██║
                  ██║   ██║   ██║██║   ██║██║     ██╔══██║██╔═══╝ ██╔══██║██║  ██║
                  ██║   ╚██████╔╝╚██████╔╝╚██████╗██║  ██║██║     ██║  ██║██████╔╝
                  ╚═╝    ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═════╝ 
            */}
            <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <TopItems>
                {
                  myContext.thuchPadData != undefined ? 
                    myContext.thuchPadData.steps.map((item, index) => (
                      <TapItem w={myContext.thuchPadData.steps.length} key={ index } keys = { index } active={myContext.TouchpadtabSelect} onClick = {() => myContext.TouchpadSetTabSelect(index)}>
                        <span>
                          {item.name}
                        </span>
                        {/* <span>
                          £{item.price}
                        </span> */}
                        <div></div>
                      </TapItem>
                    ))
                  : null
                }
              </TopItems>
              <Hr></Hr>
              <Selector>
                {
                  myContext.thuchPadData != null ?
                    myContext.thuchPadData.items[myContext.TouchpadtabSelect].map((item, index) => (
                      <SelectItemPrice>

                        <SelectItem 
                          key={index} 
                          bgImg={item.selet}
                          now = { myContext.touchpad === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.touchpad[0] + myContext.touchpad[1]}
                          me = { 10000 * myContext.snapIndex + 100 * myContext.TouchpadtabSelect + index }
                          onClick={() => { 
                            myContext.setTouchpad([myContext.TouchpadtabSelect, index]);
                          }}
                          onMouseOver={() => myContext.setHoverImg(item.image)}
                          onMouseLeave={() => myContext.setHoverImg(null)}
                        ></SelectItem>
                        {
                          '£'+item.price
                        }
                      </SelectItemPrice>
                    ))
                  : null
                }
              </Selector>
            </SwiperSlide>
            {/**
             * ████████╗██████╗ ██╗███╗   ███╗
               ╚══██╔══╝██╔══██╗██║████╗ ████║
                  ██║   ██████╔╝██║██╔████╔██║
                  ██║   ██╔══██╗██║██║╚██╔╝██║
                  ██║   ██║  ██║██║██║ ╚═╝ ██║
                  ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝
             */}
             <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Hr></Hr>
              <Selector>
                {
                  myContext.trimData != null ?
                    myContext.trimData.items[myContext.TrimtabSelect].map((item, index) => (
                      <SelectItemPrice>
                        <SelectItem
                          key={index} 
                          bgImg={item.selet} 
                          now = { myContext.trim === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.trim[0] + myContext.trim[1]}
                          me = { 10000 * myContext.snapIndex + 100 * myContext.TrimtabSelect + index }
                          onClick={() => myContext.setTrim([myContext.TrimtabSelect, index])}
                          onMouseOver={() => myContext.setHoverImg(item.image)}
                          onMouseLeave={() => myContext.setHoverImg(null)}
                        ></SelectItem>
                        {
                          '£' + item.price
                        }
                      </SelectItemPrice>
                    ))
                  : null
                }
              </Selector>
            </SwiperSlide>
            {/**
             * ████████╗██████╗ ██╗ ██████╗  ██████╗ ███████╗██████╗ 
               ╚══██╔══╝██╔══██╗██║██╔════╝ ██╔════╝ ██╔════╝██╔══██╗
                  ██║   ██████╔╝██║██║  ███╗██║  ███╗█████╗  ██████╔╝
                  ██║   ██╔══██╗██║██║   ██║██║   ██║██╔══╝  ██╔══██╗
                  ██║   ██║  ██║██║╚██████╔╝╚██████╔╝███████╗██║  ██║
                  ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝
            */}
            <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <TopItems>
                {
                  myContext.triggersData != null ? 
                    myContext.triggersData.steps.map((item, index) => (
                      <TapItem w={ myContext.triggersData.steps.length} key={ index } keys = { index } active={myContext.TriggertabSelect} onClick = {() => myContext.TriggerSetTabSelect(index)}>
                        <span>
                          {item.name}
                        </span>
                        {/* <span>
                          £{item.price}
                        </span> */}
                        <div></div>
                      </TapItem>
                    ))
                  : null
                }
              </TopItems>
              <Hr></Hr>
              <Selector>
                {
                  myContext.triggersData != null ?
                    myContext.triggersData.items[myContext.TriggertabSelect].map((item, index) => (
                      <SelectItemPrice>
                        <SelectItem
                          key={index}
                          bgImg={item.selet}
                          now = { myContext.trigger === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.trigger[0] + myContext.trigger[1]}
                          me = { 10000 * myContext.snapIndex + 100 * myContext.TriggertabSelect + index }
                          onClick={() => myContext.setTrigger([myContext.TriggertabSelect, index])}
                          onMouseOver={() => myContext.setHoverImg(item.image)}
                          onMouseLeave={() => myContext.setHoverImg(null)}
                        ></SelectItem>
                          {
                            '£'+item.price
                          }
                      </SelectItemPrice>
                    ))
                  : null
                }
              </Selector>
            </SwiperSlide>
            

            {/**
             * ██████╗  █████╗ ███████╗ ██████╗ ██████╗     ██████╗  █████╗  ██████╗██╗  ██╗
               ██╔══██╗██╔══██╗╚══███╔╝██╔═══██╗██╔══██╗    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
               ██████╔╝███████║  ███╔╝ ██║   ██║██████╔╝    ██████╔╝███████║██║     █████╔╝ 
               ██╔══██╗██╔══██║ ███╔╝  ██║   ██║██╔══██╗    ██╔══██╗██╔══██║██║     ██╔═██╗ 
               ██║  ██║██║  ██║███████╗╚██████╔╝██║  ██║    ██████╔╝██║  ██║╚██████╗██║  ██╗
               ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
             * 
            */}
            <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Hr></Hr>
              <RozorBack>
                <div>
                  <RozorItem flag={!myContext.razorBack} onClick={() => myContext.setRazorBack(false)}>
                    {/* <svg viewBox="0 0 82.46 52" className="css-7wh13m"><g id="a"></g><g id="b"><g id="c"><g><path d="M74.11,52c-7.61,0-13.66-12.71-13.91-13.26l-.05-.12c-.02-.06-.38-.84-1.95-.84H24.25c-1.57,0-1.93,.78-1.96,.87l-.04,.09c-.25,.54-6.3,13.26-13.91,13.26-2.33,0-4.24-.88-5.67-2.62C-.03,46.11-.43,40.42,.37,36.22,1.36,31,8.89,7.39,11.69,4.59l.67-.68c2.16-2.19,3.86-3.92,7.53-3.92,2.3,0,4.33,.92,6.36,2.9,.28,.09,.92,.26,1.69,.26h26.59c.77,0,1.4-.17,1.69-.26,2.03-1.98,4.06-2.9,6.36-2.9,3.67,0,5.37,1.73,7.53,3.92l.67,.68c2.8,2.79,10.33,26.41,11.32,31.63,.8,4.2,.4,9.89-2.31,13.16-1.44,1.74-3.34,2.62-5.67,2.62Zm-12.09-14.08c.29,.61,5.88,12.08,12.09,12.08,1.73,0,3.08-.62,4.13-1.89,2.18-2.63,2.6-7.78,1.88-11.51-1.14-5.95-8.64-28.45-10.77-30.59l-.68-.69c-2.11-2.14-3.27-3.32-6.1-3.32-1.23,0-2.92,.28-5.11,2.47l-.14,.14-.18,.08c-.12,.05-1.17,.47-2.62,.47H27.93c-1.45,0-2.5-.43-2.62-.47l-.18-.08-.14-.14c-2.19-2.19-3.88-2.47-5.11-2.47-2.83,0-3.99,1.18-6.1,3.32l-.68,.69c-2.14,2.14-9.64,24.64-10.77,30.59-.71,3.73-.29,8.88,1.88,11.51,1.05,1.27,2.4,1.89,4.13,1.89,6.21,0,11.79-11.47,12.09-12.08,.18-.44,1.05-2.14,3.82-2.14H58.2c2.77,0,3.64,1.7,3.82,2.14Z"></path><g><path d="M13.12,30.31c-2.21-.67-6.03-1.46-6.19-1.49l-.49-.1-1.55,5.07,.56,.65c-.01,.05-.03,.12-.05,.19-.09,.34-.22,.9-.42,1.77-.32,1.48,2.69,3.18,4.83,3.86,1.15,.37,2.65,.65,3.92,.65,1.2,0,2.19-.25,2.47-.93,.35-.82,.56-1.36,.68-1.69l.07-.18,.83-.21,1.66-5.03-.44-.2c-.15-.07-3.67-1.69-5.89-2.36Z"></path><path d="M76.02,28.71l-.49,.1c-.16,.03-3.98,.82-6.19,1.49-2.22,.68-5.74,2.29-5.89,2.36l-.44,.2,1.66,5.03,.83,.21c.02,.05,.04,.11,.07,.18,.12,.33,.34,.86,.68,1.69,.29,.68,1.27,.93,2.47,.93,1.27,0,2.77-.28,3.92-.65,2.14-.68,5.15-2.38,4.83-3.86-.19-.87-.33-1.43-.41-1.77-.02-.07-.04-.13-.05-.19l.56-.65-1.55-5.07Z"></path></g></g></g></g></svg> */}
                    {/* <img alt='razor' src={RazorbackImg} style={{width: '90%'}}></img>*/}
                    <AiOutlineStop style={{
                      height: '100px',
                      width: '90%'
                    }}></AiOutlineStop>
                    <h1>In (Default)</h1>
                    <span><BsCheck /></span>
                  </RozorItem>
                  <RozorItem flag={myContext.razorBack} onClick={() => myContext.setRazorBack(true)}>
                    {/* <svg viewBox="0 0 82.46 52" className="css-7wh13m"><g id="a"></g><g id="b"><g id="c"><g><path d="M74.11,52c-7.61,0-13.66-12.71-13.91-13.26l-.05-.12c-.02-.06-.38-.84-1.95-.84H24.25c-1.57,0-1.93,.78-1.96,.87l-.04,.09c-.25,.54-6.3,13.26-13.91,13.26-2.33,0-4.24-.88-5.67-2.62C-.03,46.11-.43,40.42,.37,36.22,1.36,31,8.89,7.39,11.69,4.59l.67-.68c2.16-2.19,3.86-3.92,7.53-3.92,2.3,0,4.33,.92,6.36,2.9,.28,.09,.92,.26,1.69,.26h26.59c.77,0,1.4-.17,1.69-.26,2.03-1.98,4.06-2.9,6.36-2.9,3.67,0,5.37,1.73,7.53,3.92l.67,.68c2.8,2.79,10.33,26.41,11.32,31.63,.8,4.2,.4,9.89-2.31,13.16-1.44,1.74-3.34,2.62-5.67,2.62Zm-12.09-14.08c.29,.61,5.88,12.08,12.09,12.08,1.73,0,3.08-.62,4.13-1.89,2.18-2.63,2.6-7.78,1.88-11.51-1.14-5.95-8.64-28.45-10.77-30.59l-.68-.69c-2.11-2.14-3.27-3.32-6.1-3.32-1.23,0-2.92,.28-5.11,2.47l-.14,.14-.18,.08c-.12,.05-1.17,.47-2.62,.47H27.93c-1.45,0-2.5-.43-2.62-.47l-.18-.08-.14-.14c-2.19-2.19-3.88-2.47-5.11-2.47-2.83,0-3.99,1.18-6.1,3.32l-.68,.69c-2.14,2.14-9.64,24.64-10.77,30.59-.71,3.73-.29,8.88,1.88,11.51,1.05,1.27,2.4,1.89,4.13,1.89,6.21,0,11.79-11.47,12.09-12.08,.18-.44,1.05-2.14,3.82-2.14H58.2c2.77,0,3.64,1.7,3.82,2.14Z"></path><g><path d="M13.74,41.41c-1.23,0-2.75-.25-4.07-.67-2.22-.71-5.58-2.54-5.16-4.44,.18-.83,.31-1.38,.4-1.73l-.57-.66,1.76-5.77,.93,.19s3.97,.82,6.24,1.5h0c2.25,.68,5.8,2.32,5.95,2.38l.85,.39-1.88,5.71-.85,.21c-.13,.34-.34,.86-.66,1.64-.35,.82-1.33,1.24-2.93,1.24Zm-8.28-7.74l.56,.64-.12,.44c-.09,.34-.22,.89-.41,1.75-.21,.97,2.24,2.56,4.49,3.28,1.21,.39,2.65,.63,3.77,.63s1.85-.23,2.01-.62c.34-.81,.55-1.34,.67-1.67l.16-.43,.82-.21,1.43-4.34-.04-.02c-.15-.07-3.64-1.67-5.83-2.34h0c-2.22-.68-6.11-1.47-6.15-1.48h-.04l-1.33,4.36Z"></path><path d="M68.72,41.41c-1.6,0-2.59-.42-2.93-1.24-.33-.78-.54-1.3-.67-1.64l-.85-.21-1.89-5.71,.85-.39c.38-.18,3.77-1.72,5.95-2.38,1.99-.6,5.25-1.3,6.2-1.5l.97-.2,1.76,5.77-.57,.66c.09,.35,.22,.9,.4,1.73,.42,1.9-2.95,3.73-5.16,4.44-1.32,.42-2.84,.67-4.07,.67Zm-3.67-3.93l.82,.2,.16,.43c.12,.33,.33,.86,.68,1.67,.16,.39,.92,.62,2.01,.62s2.56-.24,3.77-.63c2.25-.72,4.7-2.31,4.49-3.28-.19-.86-.32-1.42-.41-1.75l-.12-.44,.56-.64-1.33-4.37h-.04c-.97,.21-4.19,.9-6.15,1.49-2.12,.64-5.45,2.16-5.83,2.33l-.04,.02,1.43,4.34Z"></path></g></g></g></g></svg> */}
                    <img alt='razor selection' src={RazorbackSelectImg} style={{width: '90%'}}></img>
                    <h1>Out (No Vibration)</h1>
                    <h1>£{myContext.razorBackPrice}</h1>
                    <span><BsCheck /></span>
                  </RozorItem>
                </div>
              </RozorBack>
              {/* <RazorDiv flag={myContext.razorBack} onClick = {() => myContext.setRazorBack(!myContext.razorBack)}>
                <span>Razorback Maxfire Modes{"  "}(£{myContext.razorBackPrice})</span>
                <label>
                  <div>

                  </div>
                </label>
              </RazorDiv> */}
            </SwiperSlide>

            {/**
             * ███████╗███████╗██████╗  ██████╗ ██████╗ ████████╗███████╗
               ██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
               █████╗  ███████╗██████╔╝██║   ██║██████╔╝   ██║   ███████╗
               ██╔══╝  ╚════██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
               ███████╗███████║██║     ╚██████╔╝██║  ██║   ██║   ███████║
               ╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
             */}
             <SwiperSlide>
              <EsportsWrapper>
                <EsportsContainer>
                  <div>
                    <EsportItems flag={myContext.esportsFlag === 0} onClick={() => {
                      myContext.setPaddle(null);
                      myContext.setLRdomin(false);
                      myContext.setEsportsFlag(0);
                    }}>
                      <div>
                        <AiOutlineStop></AiOutlineStop>
                      </div>
                      <div>
                        No (Default)
                      </div>
                      <div>
                        <SBsCheck></SBsCheck>
                      </div>
                    </EsportItems>
                    <EsportItems flag={myContext.esportsFlag === 1} onClick={() => {
                      myContext.setEsportsFlag(1);
                    }}>
                      <div>
                        <img alt="no img" src={PaddleImg} style={{width: '60px'}}></img>
                        Paddles
                      </div>
                      <div>
                        £9.99
                      </div>
                      <div>
                        <SBsCheck></SBsCheck>
                      </div>
                    </EsportItems>
                    <EsportItems flag={myContext.esportsFlag === 2} onClick={() => {
                      myContext.setEsportsFlag(2);
                    }}>
                      <div>
                        <img alt="no img" src={DominLimg}></img>
                        {
                          myContext.dominselectData != null ? myContext.dominselectData.name : ''
                        }
                      </div>
                      <div>
                        £{
                          myContext.dominselectData != null ? myContext.dominselectData.price : ''
                        }
                      </div>
                      <div>
                        <SBsCheck></SBsCheck>
                      </div>
                    </EsportItems>
                  </div>

                  {/* Paddle */}
                  {
                    myContext.esportsFlag === 1 ? (
                      <div>
                        <Selector>
                          {
                            myContext.paddleData != null ?
                              myContext.paddleData.items[PaddletabSelect].map((item, index) => (
                                <SelectItemPrice>
                                <SelectItem
                                  key={index} bgImg={item.selet}
                                  now = { myContext.paddle === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.paddle[0] + myContext.paddle[1]}
                                  me = { 10000 * myContext.snapIndex + 100 * PaddletabSelect + index }
                                  onClick={() => {
                                    myContext.setPaddle([PaddletabSelect, index]);
                                    myContext.setLdomin1(null);
                                    myContext.setLdomin2(null);
                                    myContext.setRdomin1(null);
                                    myContext.setRdomin2(null);
                                  }}></SelectItem>
                                  {
                                    '£'+item.price
                                  }
                                </SelectItemPrice>
                              ))
                            : null
                          }
                        </Selector>
                        <RemapDiv>
                          <CusSwitch flag={myContext.remap} onClick={() => myContext.setRemap(!myContext.remap)}>
                            <div></div>
                          </CusSwitch>
                          <h6>Remappable Technology +£0.00</h6>
                          <MarkDiv>
                            <img alt="no img"></img>
                          </MarkDiv>
                        </RemapDiv>
                      </div>
                    ) : null
                  }

                  {/* DominBtn */}
                  {
                    myContext.esportsFlag === 2 ? (
                      <div>
                        <UnderlinedDiv>
                          <img alt="no img" src={DominLimg}></img>
                          Left DominBtn
                        </UnderlinedDiv>
                        <Selector>
                          {
                            myContext.dominselectData != null ? 
                              myContext.dominselectData.items.map((item, index) => (
                                <SelectItemPrice>
                                  <SelectItem
                                    key={index}
                                    now = { myContext.ldomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.ldomin_1}
                                    me = { 10000 * myContext.snapIndex + 100 * index }
                                    bgImg={item.select}
                                    onClick={() => myContext.setLdomin1(index)}></SelectItem>
                                    {
                                      '£'+item.price
                                    }
                                </SelectItemPrice>
                              ))
                            : null
                          }
                        </Selector>
                        {
                          myContext.ldomin_1 !== null ? (
                            <div>
                              <div><span>{DominL.steps[0].name}</span></div>
                              <Selector>
                              {
                                DominL.items.map((item, index) => (
                                  <SelectItemPrice>
                                    <SelectItem 
                                      key = {index} 
                                      bgImg = {item.select} 
                                      now = { myContext.ldomin_2 === null ? -1 : 10000 * myContext.snapIndex + myContext.ldomin_2}
                                      me = { 10000 * myContext.snapIndex + index }
                                      onClick = {() => {
                                        myContext.setLdomin2(index);
                                        myContext.setPaddle(null);
                                      }}></SelectItem>
                                      {
                                        '£'+item.price
                                      }
                                  </SelectItemPrice>
                                ))
                              }
                              </Selector>
                            </div>
                          ) : (() => {})()
                        }
                        {/* RDominBtn */}
                        <UnderlinedDiv>
                          <img alt="no img" src={DominRImg}></img>
                          Right DominBtn
                        </UnderlinedDiv>
                        <Selector>
                          {
                            myContext.dominselectData != null ? 
                              myContext.dominselectData.items.map((item, index) => (
                                <SelectItemPrice>
                                  <SelectItem
                                    key={index}
                                    bgImg={item.select}
                                    now = { myContext.rdomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.rdomin_1}
                                    me = { 10000 * myContext.snapIndex + 100 * index }
                                    onClick={() => myContext.setRdomin1(index)}></SelectItem>
                                    {
                                      '£'+item.price
                                    }
                                </SelectItemPrice>
                              ))
                            : null
                          }
                        </Selector>
                        {
                          myContext.rdomin_1 !== null ? (
                            <div>
                              <div><span>{DominR.steps[0].name}</span></div>
                              <Selector>
                              {
                                DominR.items.map((item, index) => (
                                  <SelectItemPrice>
                                    <SelectItem 
                                      key = {index} 
                                      bgImg = {item.select} 
                                      now = { myContext.rdomin_2 === null ? -1 : 10000 * myContext.snapIndex + myContext.rdomin_2}
                                      me = { 10000 * myContext.snapIndex + index }
                                      onClick = {() => {
                                        myContext.setRdomin2(index);
                                        myContext.setPaddle(null);
                                      }}></SelectItem>
                                      {
                                        '£'+item.price
                                      }
                                  </SelectItemPrice>
                                ))
                              }
                              </Selector>
                            </div>
                          ) : (() => {})()
                        }
                      </div>
                    ) : null
                  }
                </EsportsContainer>
              </EsportsWrapper>
             </SwiperSlide>
             {/**
             * ██████╗ ███████╗ █████╗ ██████╗     ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗
               ██╔══██╗██╔════╝██╔══██╗██╔══██╗    ██╔══██╗██╔════╝██╔════╝██║██╔════╝ ████╗  ██║
               ██████╔╝█████╗  ███████║██████╔╝    ██║  ██║█████╗  ███████╗██║██║  ███╗██╔██╗ ██║
               ██╔══██╗██╔══╝  ██╔══██║██╔══██╗    ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║
               ██║  ██║███████╗██║  ██║██║  ██║    ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║
               ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
            */}
            <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <TopItems>
              </TopItems>
              <Hr></Hr>
              <Selector>
                {
                  myContext.rearDesignData != null ? 
                    myContext.rearDesignData.items[RearDesigntabSelect].map((item, index) => (
                      <SelectItemPrice>
                        <SelectItem
                          key={index} 
                          bgImg={item.selet}
                          now = { myContext.rearDesign === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.rearDesign[0] + myContext.rearDesign[1]}
                          me = { 10000 * myContext.snapIndex + 100 * RearDesigntabSelect + index }
                          onClick={() => myContext.setRearDesign([RearDesigntabSelect, index])}
                        ></SelectItem>
                        {
                          '£'+item.price
                        }
                      </SelectItemPrice>
                    ))
                  : null
                }
              </Selector>
            </SwiperSlide>
            {/**
             * 
             * ██████╗  █████╗ ██████╗ ██████╗ ██╗     ███████╗
               ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝
               ██████╔╝███████║██║  ██║██║  ██║██║     █████╗  
               ██╔═══╝ ██╔══██║██║  ██║██║  ██║██║     ██╔══╝  
               ██║     ██║  ██║██████╔╝██████╔╝███████╗███████╗
               ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝
             */}
            {/* <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Hr></Hr>
              <PaddleWrapper>
                <RazorDiv flag={myContext.pad_esp_flag} onClick = {() => myContext.setPad_esp_flag(!myContext.pad_esp_flag)}>
                  <span>Paddles</span>
                  <label><div></div></label>
                </RazorDiv>
                {
                  myContext.pad_esp_flag ? (
                    <Selector>
                      {
                        Paddle.items[PaddletabSelect].map((item, index) => (
                          <SelectItemPrice>
                          <SelectItem
                            key={index} bgImg={item.select}
                            now = { myContext.paddle === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.paddle[0] + myContext.paddle[1]}
                            me = { 10000 * myContext.snapIndex + 100 * PaddletabSelect + index }
                            onClick={() => myContext.setPaddle([PaddletabSelect, index])}></SelectItem>
                            {
                              '£'+item.price
                            }
                          </SelectItemPrice>
                        ))
                      }
                    </Selector>
                  ) : (
                    <span></span>
                  )
                }
              </PaddleWrapper>
            </SwiperSlide> */}
            {/**
             * ██╗     ███████╗███████╗████████╗    ██████╗  ██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗  ██████╗ ██████╗     ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗
               ██║     ██╔════╝██╔════╝╚══██╔══╝    ██╔══██╗██╔═══██╗████╗ ████║██║████╗  ██║██╔══██╗██╔═══██╗██╔══██╗    ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║
               ██║     █████╗  █████╗     ██║       ██║  ██║██║   ██║██╔████╔██║██║██╔██╗ ██║╚█████╔╝██║   ██║██████╔╝    ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║
               ██║     ██╔══╝  ██╔══╝     ██║       ██║  ██║██║   ██║██║╚██╔╝██║██║██║╚██╗██║██╔══██╗██║   ██║██╔══██╗    ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║
               ███████╗███████╗██║        ██║       ██████╔╝╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚█████╔╝╚██████╔╝██║  ██║    ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║
               ╚══════╝╚══════╝╚═╝        ╚═╝       ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚════╝  ╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
             */}
             {/* <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
             <Hr></Hr>
              <LDominWrapper>
                <RazorDiv flag={!myContext.pad_esp_flag} onClick = {() => myContext.setPad_esp_flag(!myContext.pad_esp_flag)}>
                  <span>Left Domin button</span>
                  <label><div></div></label>
                </RazorDiv>
                {
                  !myContext.pad_esp_flag ? (
                    <LDominContainer>
                      <div>
                        <div>
                          <div>
                            <span>{DominSelection.steps.name}</span>
                          </div>
                          <Selector>
                            {
                              DominSelection.items.map((item, index) => (
                                <SelectItemPrice>
                                  <SelectItem
                                    key={index}
                                    now = { myContext.ldomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.ldomin_1}
                                    me = { 10000 * myContext.snapIndex + 100 * index }
                                    bgImg={item.select}
                                    onClick={() => myContext.setLdomin1(index)}></SelectItem>
                                    {
                                      '£'+item.price
                                    }
                                </SelectItemPrice>
                              ))
                            }
                          </Selector>
                        </div>
                        {
                          myContext.ldomin_1 !== null ? (
                            <div>
                              <div><span>{DominL.steps[0].name}</span></div>
                              <Selector>
                              {
                                DominL.items.map((item, index) => (
                                  <SelectItemPrice>
                                    <SelectItem 
                                      key = {index} 
                                      bgImg = {item.select} 
                                      now = { myContext.ldomin_2 === null ? -1 : 10000 * myContext.snapIndex + myContext.ldomin_2}
                                      me = { 10000 * myContext.snapIndex + index }
                                      onClick = {() => myContext.setLdomin2(index)}></SelectItem>
                                      {
                                        '£'+item.price
                                      }
                                  </SelectItemPrice>
                                ))
                              }
                              </Selector>
                            </div>
                          ) : (() => {})()
                        }
                      </div>
                    </LDominContainer>
                  ) : (
                    <span></span>
                  )
                }
              </LDominWrapper>
            </SwiperSlide> */}
            {/**
             * ██████╗ ██╗ ██████╗ ██╗  ██╗████████╗    ██████╗  ██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗  ██████╗ ██████╗     ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗
               ██╔══██╗██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔══██╗██╔═══██╗████╗ ████║██║████╗  ██║██╔══██╗██╔═══██╗██╔══██╗    ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║
               ██████╔╝██║██║  ███╗███████║   ██║       ██║  ██║██║   ██║██╔████╔██║██║██╔██╗ ██║╚█████╔╝██║   ██║██████╔╝    ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║
               ██╔══██╗██║██║   ██║██╔══██║   ██║       ██║  ██║██║   ██║██║╚██╔╝██║██║██║╚██╗██║██╔══██╗██║   ██║██╔══██╗    ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║
               ██║  ██║██║╚██████╔╝██║  ██║   ██║       ██████╔╝╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚█████╔╝╚██████╔╝██║  ██║    ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║
               ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚════╝  ╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
             */}
             {/* <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
             <Hr></Hr>
              <LDominWrapper>
                <RazorDiv flag={!myContext.pad_esp_flag} onClick = {() => myContext.setPad_esp_flag(!myContext.pad_esp_flag)}>
                  <span>Left Domin button</span>
                  <label><div></div></label>
                </RazorDiv>
                {
                  !myContext.pad_esp_flag ? (
                    <LDominContainer>
                      <div>
                        <div>
                          <div>
                            <span>{DominSelection.steps.name}</span>
                          </div>
                          <Selector>
                            {
                              DominSelection.items.map((item, index) => (
                                <SelectItemPrice>
                                  <SelectItem
                                    key={index}
                                    bgImg={item.select}
                                    now = { myContext.rdomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.rdomin_1}
                                    me = { 10000 * myContext.snapIndex + 100 * index }
                                    onClick={() => myContext.setRdomin1(index)}></SelectItem>
                                    {
                                      '£'+item.price
                                    }
                                </SelectItemPrice>
                              ))
                            }
                          </Selector>
                        </div>
                        {
                          myContext.rdomin_1 !== null ? (
                            <div>
                              <div><span>{DominR.steps[0].name}</span></div>
                              <Selector>
                                {
                                  DominR.items.map((item, index) => (
                                    <SelectItemPrice>
                                      <SelectItem
                                        key={index}
                                        bgImg={item.select}
                                        now = { myContext.rdomin_2 === null ? -1 : 10000 * myContext.snapIndex + myContext.rdomin_2}
                                        me = { 10000 * myContext.snapIndex + index }
                                        onClick={() => myContext.setRdomin2(index)}>
                                      </SelectItem>
                                      {
                                        '£'+item.price
                                      }
                                    </SelectItemPrice>
                                  ))
                                }
                              </Selector>
                            </div>
                          ) : (() => {})()
                        }
                      </div>
                    </LDominContainer>
                  ) : (
                    <span></span>
                  )
                }
              </LDominWrapper>
            </SwiperSlide> */}
            {/**
             * ██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗         ████████╗██████╗ ██╗ ██████╗  ██████╗ ███████╗██████╗ ███████╗
               ██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║         ╚══██╔══╝██╔══██╗██║██╔════╝ ██╔════╝ ██╔════╝██╔══██╗██╔════╝
               ██║  ██║██║██║  ███╗██║   ██║   ███████║██║            ██║   ██████╔╝██║██║  ███╗██║  ███╗█████╗  ██████╔╝███████╗
               ██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║            ██║   ██╔══██╗██║██║   ██║██║   ██║██╔══╝  ██╔══██╗╚════██║
               ██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗       ██║   ██║  ██║██║╚██████╔╝╚██████╔╝███████╗██║  ██║███████║
               ╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
             */}
             <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Hr></Hr>
                {/* <RazorDiv flag={myContext.digital_trigger} onClick = {() => myContext.setDigital_trigger(!myContext.digital_trigger)}>
                  <span>Digital Triggers{"  "}(£{myContext.digital_trigger_price})</span>
                  <label>
                    <div>
                    </div>
                  </label>
                </RazorDiv> */}
                <TextOptionDiv>
                  <TextOption stat = {!myContext.digital_trigger} onClick={() => myContext.setDigital_trigger(false)}>
                    <AiOutlineStop style={{
                      width: '55px',
                      height: '36px'
                    }}></AiOutlineStop>
                    <h1>No (Default)</h1>
                    <BsCheck></BsCheck>
                  </TextOption>
                  <TextOption stat = {myContext.digital_trigger} onClick={() => myContext.setDigital_trigger(true)}>
                    <img src={DTriggerImg} alt="img"></img>
                    <h1>Add Digital Trigger</h1>
                    <BsCheck></BsCheck>
                  </TextOption>
                </TextOptionDiv>
              </SwiperSlide>
              {/**
               *  /$$$$$$$$                    /$$                                     /$$       /$$                                    
                  |__  $$__/                   | $$                                    | $$      | $$                                    
                    | $$  /$$$$$$  /$$   /$$ /$$$$$$          /$$$$$$  /$$$$$$$   /$$$$$$$      | $$        /$$$$$$   /$$$$$$   /$$$$$$ 
                    | $$ /$$__  $$|  $$ /$$/|_  $$_/         |____  $$| $$__  $$ /$$__  $$      | $$       /$$__  $$ /$$__  $$ /$$__  $$
                    | $$| $$$$$$$$ \  $$$$/   | $$            /$$$$$$$| $$  \ $$| $$  | $$      | $$      | $$  \ $$| $$  \ $$| $$  \ $$
                    | $$| $$_____/  >$$  $$   | $$ /$$       /$$__  $$| $$  | $$| $$  | $$      | $$      | $$  | $$| $$  | $$| $$  | $$
                    | $$|  $$$$$$$ /$$/\  $$  |  $$$$/      |  $$$$$$$| $$  | $$|  $$$$$$$      | $$$$$$$$|  $$$$$$/|  $$$$$$$|  $$$$$$/
                    |__/ \_______/|__/  \__/   \___/         \_______/|__/  |__/ \_______/      |________/ \______/  \____  $$ \______/ 
               */}
              <SwiperSlide>
                <EsportsWrapper>
                  <EsportsContainer>
                    <div>
                      <EsportItems flag={!myContext.isText && !myContext.isLogo} onClick={() => {
                        myContext.setIsText(false);
                        myContext.setLogo(false);
                      }}>
                        <div>
                          {/* <AiOutlineStop></AiOutlineStop> */}
                          <img alt='no' src={NoImg}></img>
                        </div>
                        <div>
                          {
                            myContext.personalizationData != null ? myContext.personalizationData[1].name : null
                          }
                        </div>
                        <div>
                          <SBsCheck></SBsCheck>
                        </div>
                      </EsportItems>
                      <EsportItems flag={myContext.isText} onClick={() => {
                        myContext.setIsText(true);
                        myContext.setLogo(false);
                      }}>
                        <div>
                          <img alt="no img" src={TextImg} style={{width: '45px', marginRight: '5px'}}></img>
                          {
                            myContext.personalizationData != null ? myContext.personalizationData[2].name : null
                          }
                        </div>
                        <div>
                          £{
                            myContext.textPrice
                          }
                        </div>
                        <div>
                          <SBsCheck></SBsCheck>
                        </div>
                      </EsportItems>
                      <EsportItems flag={myContext.isLogo} onClick={() => {
                        myContext.setIsText(false);
                        myContext.setLogo(true);
                      }}>
                        <div>
                          <img alt="no img" src={CateImgs[13].image} style={{marginRight: '5px'}}></img>
                          {
                            myContext.personalizationData != null ? myContext.personalizationData[3].name : null
                          }
                        </div>
                        <div>
                          £{
                            myContext.logoPrice
                          }
                        </div>
                        <div>
                          <SBsCheck></SBsCheck>
                        </div>
                      </EsportItems>
                    </div>

                    {/* Paddle */}
                    {
                      !myContext.isText ? (() => {})() : (
                        <TextDiv>
                          <input type="text" className="added-text" maxLength="14" value={myContext.textVal} onChange={(e) => {
                            myContext.setTextVal(e.target.value);
                            if (e.target.value.length > 0) {
                              myContext.setTxtStatus(true);
                            }
                          }} placeholder={"Enter text here"}/>
                          <select className="font-type" onChange={(e) => {
                            myContext.setFamily(e.target.value[0]);
                            console.log(e.target.value[0]);
                          }}>
                            <FontOption value={0}>Font</FontOption>
                            {
                              myContext.fontFamiles.map((item, index) => (
                                <FontOption family={item.family} key={index} value={[index, font_zoom[index]]}>
                                  {
                                    item.name
                                  }
                                </FontOption>
                              ))
                            }
                          </select>
                          <select className="font-type" onChange={(e) => myContext.setTextColor(e.target.value)} >
                          <option value='black'>Font Colour</option>
                            <option value='black'>Black</option>
                            <option value='white'>White</option>
                            <option value='blue'>Blue</option>
                            <option value='red'>Red</option>
                            <option value='yellow'>Yellow</option>
                            <option value='green'>Green</option>
                          </select>
                        </TextDiv>
                      )
                    } 

                    {/* Logo */}
                    {
                      myContext.isLogo ? (
                        <span>
                          <ImgDiv>
                            <UploadImg 
                              onClick={() => {
                                myContext.setModalFlag(true);
                                // onImageUpload()
                              }}
                            >
                              <span><FiUpload></FiUpload></span>
                              <h1>Download image</h1>
                              <h1>Maximum file size 2MB</h1>
                            </UploadImg>
                          <ImageUploading
                            value={myContext.images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            // acceptType={['jpg', 'gif', 'png']}
                            // maxFileSize={1024 * 1024 * 2}
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              // write your building UI
                              <UploadImg 
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                id="file_selector"
                                {...dragProps}
                              >
                              </UploadImg>
                            )}
                          </ImageUploading>
                        </ImgDiv>
                      </span>
                      ) : null
                    }
                  </EsportsContainer>
                </EsportsWrapper>
              </SwiperSlide>
            {/**
             * 
             * ████████╗███████╗██╗  ██╗████████╗
               ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
                  ██║   █████╗   ╚███╔╝    ██║   
                  ██║   ██╔══╝   ██╔██╗    ██║   
                  ██║   ███████╗██╔╝ ██╗   ██║   
                  ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   
             */}
             {/* <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
             <Hr></Hr>
              <TextOptionDiv>
                <TextOption stat = {!myContext.isText} onClick={() => myContext.setIsText(false)}>
                  <h1>No (Default)</h1>
                  <BsCheck></BsCheck>
                </TextOption>
                <TextOption stat = {myContext.isText} onClick={() => myContext.setIsText(true)}>
                  <h1>Add Text</h1>
                  <BsCheck></BsCheck>
                </TextOption>
              </TextOptionDiv>
              {
                !myContext.isText ? (() => {})() : (
                  <TextDiv>
                    <input type="text" className="added-text" maxLength="14" value={myContext.textVal} onChange={(e) => {
                      myContext.setTextVal(e.target.value);
                      if (e.target.value.length > 0) {
                        myContext.setTxtStatus(true);
                      }
                    }} placeholder={"Enter text here"}/>
                    <select className="font-type" onChange={(e) => myContext.setFamily(e.target.value)}>
                      {
                        myContext.fontFamiles.map((item, index) => (
                          <FontOption family={item.family} key={index} value={index} >
                            {
                              item.name
                            }
                          </FontOption>
                          
                        ))
                      }
                    </select>
                    <select className="font-type" onChange={(e) => myContext.setTextColor(e.target.value)} >
                      <option value='black'>Black</option>
                      <option value='white'>White</option>
                      <option value='blue'>Blue</option>
                      <option value='red'>Red</option>
                      <option value='yellow'>Yellow</option>
                      <option value='green'>Green</option>
                    </select>
                    <select className='font-type' onChange={(e) => myContext.setFontSize(e.target.value)}>
                      <option value={30}>Small</option>
                      <option value={40}>Medium</option>
                      <option value={50}>Large</option>
                    </select>
                  </TextDiv>
                )
              } 
             </SwiperSlide> */}
             {/**
              * ██╗      ██████╗  ██████╗  ██████╗ 
                ██║     ██╔═══██╗██╔════╝ ██╔═══██╗
                ██║     ██║   ██║██║  ███╗██║   ██║
                ██║     ██║   ██║██║   ██║██║   ██║
                ███████╗╚██████╔╝╚██████╔╝╚██████╔╝
                ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ 
              */}
              {/* <SwiperSlide style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Hr></Hr>
                <TextOptionDiv>
                  <TextOption stat = {!myContext.isLogo} onClick={() => myContext.setLogo(false)}>
                    <h1>No (Default)</h1>
                    <BsCheck></BsCheck>
                  </TextOption>
                  <TextOption stat = {myContext.isLogo} onClick={() => myContext.setLogo(true)}>
                    <h1>Add Logo</h1>
                    <BsCheck></BsCheck>
                  </TextOption>
                </TextOptionDiv>
                {
                  !myContext.isLogo ? (() => {})() : (
                    <TextDiv>
                        <UploadImg 
                          onClick={() => {
                            myContext.setModalFlag(true);
                            // onImageUpload()
                          }}
                        >
                          <span><FiUpload></FiUpload></span>
                          <h1>Download image</h1>
                          <h1>Maximum file size 2MB</h1>
                        </UploadImg>
                      <ImageUploading
                        value={myContext.images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        // acceptType={['jpg', 'gif', 'png']}
                        // maxFileSize={1024 * 1024 * 2}
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <UploadImg 
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            id="file_selector"
                            {...dragProps}
                          >
                          </UploadImg>
                        )}
                      </ImageUploading>
                    </TextDiv>
                  )
                } 
              </SwiperSlide> */}
              {/** 
               */}
              <SwiperSlide>
                <AddToCartDiv>
                  <button onClick = {() => AddToCart()}>Add to cart</button>
                </AddToCartDiv>
              </SwiperSlide>
        </Swiper>
      </MediumDiv>

      {/**
       * ------------------------------------------------- Arror Area ------------------------------------------------- 
       */}

      {/* <ConfirmDiv flag={ myContext.snapIndex === 10 || myContext.snapIndex === 14 || myContext.snapIndex === 15 || myContext.snapIndex === 16 ? false : true }> */}
        {/* <button onClick={() => myContext.func_reset(myContext.snapIndex)}>Reset</button> */}
      {/* </ConfirmDiv> */}
      <LocalFooter>
        <div>
					<p>
						<span>Part Selected : </span> 
					{
						myContext.snapIndex === 0 && myContext.designData !== null ? myContext.designData.items[myContext.design[0]][myContext.design[1]].name : null
					}
					{
						myContext.snapIndex === 1 && myContext.abxyData !== null ? myContext.abxyData.items[myContext.abxy[0]][myContext.abxy[1]].name : null                    
					}
					{
						myContext.snapIndex === 2 && myContext.dpadData !== null ? myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].name : null                    
					}
					{
						myContext.snapIndex === 3 && myContext.thubmLData !== null ? myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].name : null                    
					}
					{
						myContext.snapIndex === 4 && myContext.thubmRData !== null ? myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].name : null
					}
					{
						myContext.snapIndex === 5 && myContext.startBackData !== null ? myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].name : null                    
					}
					{
						myContext.snapIndex === 6 && myContext.thuchPadData !== null ? myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].name : null                    
					}
					{
						myContext.snapIndex === 7 && myContext.trimData !== null ? myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].name : null
					}
					{
						myContext.snapIndex === 8 && myContext.triggersData !== null ? myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].name : null                    
					}
					{
						myContext.snapIndex === 9 && myContext.razorBackData !== null && myContext.razorBack ? myContext.razorBackData.name : null
					}
					{
						myContext.snapIndex === 10 && myContext.esportsData !== null ? myContext.esportsData.values[myContext.esportsFlag].name : null
					}
					{
						myContext.snapIndex === 11 && myContext.rearDesignData !== null ? myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].name : null
					}
					</p>
					<div id="info_div">
						<TotalPrice>
							<span>
								Total
							</span>
							<span>
								£{
									Math.round((myContext.initalPrice +
										Number(myContext.design !== null && myContext.designData != null ? myContext.designData.items[myContext.design[0]][myContext.design[1]].price : 0) +
										Number(myContext.abxy !== null && myContext.anxyData != null ? myContext.anxyData.items[myContext.abxy[0]][myContext.abxy[1]].price : 0) +
										Number(myContext.dpad !== null && myContext.dpadData != null ? myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].price : 0) + 
										Number(myContext.thumbstickL !== null && myContext.thubmLData ? myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].price : 0) +
										Number(myContext.thumbstickR !== null && myContext.thubmRData ? myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].price : 0) + 
										Number(myContext.startBtn !== null && myContext.startBackData ? myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].price : 0) + 
										Number(myContext.touchpad !== null && myContext.thuchPadData ? myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].price : 0) + 
										Number(myContext.trim !== null && myContext.trimData ? myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].price : 0) + 
										Number(myContext.trigger !== null && myContext.triggersData ? myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].price : 0) + 
										Number(myContext.rearDesign !== null && myContext.rearDesignData ? myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].price : 0) + 
										Number(myContext.razorBack ? myContext.razorBackPrice : 0) + 
										Number(myContext.paddle !== null && myContext.paddleData ? myContext.paddleData.items[myContext.paddle[0]][myContext.paddle[1]].price : 0) + 
										Number(myContext.ldomin_2 !== null && myContext.dominselectData ? Number(DominL.items[myContext.ldomin_2].price) + Number(myContext.dominselectData.items[myContext.ldomin_1].price) : 0) + 
										Number(myContext.rdomin_2 !== null && myContext.dominselectData ? Number(DominR.items[myContext.rdomin_2].price) + Number(myContext.dominselectData.items[myContext.rdomin_1].price) : 0) + 
										Number(myContext.digital_trigger ? myContext.digital_trigger_price : 0) + 
										Number(myContext.isText ? myContext.textPrice : 0) + 
										Number(myContext.isLogo ? myContext.logoPrice : 0)
									) * 100
									) / 100
								}
							</span>
						</TotalPrice>
						<Info>
							<div>
								<span> Estimated Delivery </span>
								<EDD>
									04/04/2022
								</EDD>
							</div>
							<ATC onClick={() => handleCaptureClick()} flag={myContext.isFinished}>
								<img alt="no img"></img>
								Add
							</ATC>
						</Info>
					</div>
        </div>
      </LocalFooter>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: ${props => props.theme.ToolBgColor};
  border-left: 3px solid ${props => props.theme.ThemeColor};
  overflow: hidden;
  width: 40%;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 60%;
  }
`

const TopDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
  @media screen and (max-width: 800px) {
    margin: 0;
  }
  
  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    progress {
      color: red;
      width: 90%;
      height: 8px;
      border-radius: 20px;
      margin: 10px;
    }
    @media screen and (max-width: 800px) {
      padding: 0;
    }
    progress::-webkit-progress-value {
      background: ${props => props.theme.ThemeColor};
      border: 0;
      border-radius: 20px;
      box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);
    }
    progress::-moz-progress-bar {
      background: ${props => props.theme.ThemeColor};
      border: 0;
      border-radius: 20px;
      box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);
    }

    progress::-webkit-progress-bar {
      border: 0;
      border-radius: 20px;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    position: relative;
    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
      gap: 10px;
      align-items: center;
      color: ${props => props.theme.color};
      font-family: 'Rajdhani-Medium';
      font-size:20px;
      img {
        width: 30px;
        margin: 0 5px;
        margin-left: 8px;
      }
      & > span:nth-child(2) {
        display: flex;
        flex-direction: column;
      }
    }

    & > div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      & > span:nth-child(1) {
        color: white;
        img {
          content: url(${props => props.theme.FlagIcon});
          transform: scale(1.1);
        }
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > span:nth-child(2) {
        color: ${props => props.theme.color};
        font-size: 25px;
        cursor: pointer;
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > span:nth-child(3) {
        padding: 5px 7px;
        border: ${props => props.theme.DirectIconBorder};
        background-color: ${props => props.theme.DirectIconBgColor};
        border-radius: 10px;
        height: 60%;
        display: flex;
        align-items: center;
        svg {
          color: ${props => props.theme.color};
        }
        cursor: pointer;
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > span:nth-child(4) {
        padding: 5px 7px;
        height: 60%;
        border: ${props => props.theme.DirectIconBorder};
        background-color: ${props => props.theme.DirectIconBgColor};
        border-radius: 10px;
        display: flex;
        align-items: center;
        svg {
          color: ${props => props.theme.color};
        }
        cursor: pointer;
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
`
const TopItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: calc(100% - 20px);
  @media screen and (max-width: 800px){
    height: min-content;
    display: none;
  }
`

const TapItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(80% / ${props => props.w});
  background-color: ${props => props.keys === props.active ? props.theme.TapSelectBgColor : props.theme.TapBgColor};
  color: ${props => props.keys === props.active ? props.theme.TapSelectColor : props.theme.TapColor};
  border-radius: 5px;
  font-family: 'sofiapro';
  position: relative;
  padding: 13px 13px;
  @media screen and (max-width: 800px) {
    padding: 2px 2px;
  }
  cursor: pointer;
  & > span:nth-child(1) {
    font-size: 15 px;
    white-space: nowrap;
  }
  ${props => {
    if (props.keys === props.active) {
      return css`box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.58);`
    }
  }}
  div {
    position: absolute;
    background-color: ${props => props.keys === props.active ? props.theme.ThemeColor : 'none'};
    width: 100%;
    height: 3px;
    bottom: 0;
    ${props => {
      if (props.keys === props.active) {
        return css`box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);`;
      }
    }}
  }
`

const SwiperProcessor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  progress {
    @media screen and (max-width: 1512px) {
      width: 100%;
    }
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
  & > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: ${props => props.theme.color};
    font-family: 'Rajdhani-Medium';
    progress {
      @media screen and (max-width: 800px) {
        width: 200px;
      }
    }
  }
  & > span:nth-child(2) {
    padding: 5px 12px;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.DirectIconBgColor};
    border-radius: 10px;
    img {
      content: url(${props => props.theme.LeftDirectIconImg});
    }
    cursor: pointer;
  }
  & > span:nth-child(3) {
    padding: 5px 12px;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.DirectIconBgColor};
    border-radius: 10px;
    img {
      content: url(${props => props.theme.RightDirectIconImg});
    }
    cursor: pointer;
  }
`

const MediumDiv = styled.div`
  height: calc(100% - 105px - 75px);
  @media screen and (max-width: 800px) {
    height: calc(100% - 105px - 20px);
  }
  overflow: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.ScrollTraker};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${props => props.theme.ScrollBar};
  }

  overflow: auto;
  /* height: 60%; */
`

const ConfirmDiv = styled.div`
  height: 60px;
  display: ${props => props.flag ? 'flex' : 'none'};
  justify-content: space-around;
  align-items: center;
  button {
    padding: 10px 30px;
    border: 1px solid ${props => props.theme.ThemeColor};
    background-color: ${props => props.theme.HeadIconBgColor};
    border-radius: 10px;
    font-family: 'Rajdhani-Medium';
    color: ${props => props.theme.color}
  }
  @media screen and (max-width: 800px) {
    height: min-content;
  }
`

const Selector = styled.div`
  /* background-color: ${props => props.theme.ToolBgColor}; */
  /* background-color: red; */
  width: 90%;
  display: flex;
  padding: 30px 10px;
  gap: 20px;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-x: auto;
  margin-bottom: 50px;
  @media screen and (max-width: 800px) {
    /* flex-wrap: nowrap; */
    padding: 10px 10px;
    height: 55%;
  }
  /* height: 100%; */
`

const SelectItem = styled.div`
  min-width: 50px;
  min-height: 50px;
  border-radius: 20px;
  outline: ${props => props.now !== props.me ? '2px solid white' : `4px solid ${props.theme.ThemeColor}`};
  box-shadow: ${props => props.now === props.me ? '0px 0px 13px 4px ' + props.theme.ThemeColor : null};
  color: white;
  background-image: url(${props => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    transform: scale(1.1);
  }
  margin-bottom: 5px;
`

const SelectItemPrice = styled.div`
  text-align: center;
  color: ${props => props.theme.color};
  font-family: 'Rajdhani-Light';
  font-size: 13px;
`

const RazorDiv = styled.div`
  width: calc(100% - 60px);
  display: flex;
  background-color: ${props => props.theme.DirectIconBgColor};
  margin: 10px;
  margin-top: 20px;
  padding: 0 20px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  font-family: 'Rajdhani-Medium';
  color: ${props => props.theme.color};
  border: ${props => props.theme.DirectIconBorder};
  & > label:nth-child(2) {
    width: 60px;
    height: 50%;
    background-color: ${props => props.flag ? props.theme.ThemeColor : '#aaa'};
    border-radius: 20px;
    position: relative;
    div {
      position: absolute;
      background-color: white;
      display: inline-block;
      height: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 20px;
      transition: all .5s;
      top: 0;
      ${props => props.flag ? 'right' : 'left'}: 1px;
    }
  }
`

const PaddleWrapper = styled.div`
  width: 100%;
`
const LDominWrapper = styled.div`
  width: 100%;
`

const LDominContainer = styled.div`
  padding: 0 10px;
  & > div:nth-child(1) {
    border: 1px solid ${props => props.theme.ThemeColor};
    & > div:nth-child(1), > div:nth-child(2) {
      & > div:nth-child(1) {
        display: flex;
        background-color: ${props => props.theme.DirectIconBgColor};
        margin: 10px;
        padding: 0 20px;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        font-family: 'Rajdhani-Medium';
        color: ${props => props.theme.color};
        border: ${props => props.theme.DirectIconBorder};
        color: ${props => props.theme.color}
      }
    }
  }
`

const TextDiv = styled.div`
  margin: 10px;
  border: 1px solid ${props => props.theme.ThemeColor};
  padding: 5px;
  color: ${props => props.theme.color};
  .added-text {
    color: ${props => props.theme.color};
    width: calc(100% - 2 * 10px);
    padding: 10px;
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.HeadIconBgColor};
    margin-bottom: 20px;
  }
  .font-type {
    color: ${props => props.theme.color};
    width: 100%;
    padding: 10px;
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.DirectIconBgColor};
    margin-bottom: 20px;
  }
`

const ImgDiv = styled.div`
  margin: 10px 50px;
  border: 1px solid ${props => props.theme.ThemeColor};
  color: ${props => props.theme.color};
  .added-text {
    color: ${props => props.theme.color};
    width: calc(100% - 2 * 50px);
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.HeadIconBgColor};
  }
  .font-type {
    color: ${props => props.theme.color};
    width: 100%;
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.DirectIconBgColor};
  }
`

const FontOption = styled.option`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  outline: none;
  border: ${props => props.theme.DirectIconBorder};
  margin-bottom: 20px;
  min-height: 30px;
  height: 20px;
  font-family: ${props => props.family};
`;

const UploadImg = styled.div`
  padding: 10px;
  color: ${props => props.theme.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
      stroke: ${props => props.theme.ThemeColor}
    }
  }
  h1 {
    font-family: 'Rajdhani-Light';
    font-weight: lighter;
    font-size: 20px;
  }

`

// Chaing...
const Hr = styled.div`
  height: 3px;
  width: 100%;
  background-color: #494B51;
  display: inline-block;

  & + ${Selector} {
    overflow-y: auto;
    height: 100%;
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }

    ::-webkit-scrollbar-track {
      background: ${props => props.theme.ScrollTraker};
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${props => props.theme.ScrollBar};
    }
    @media screen and (max-width: 800px) {
      height: 55%;
    }
  }
`

const Menu = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: ${props => props.mf ? 'black':'none'};
  overflow: auto;
`

const Remove = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  span {
    margin: 20px 20px 0 0;
    float: right;
    font-size: 30px;
    color: ${props => props.theme.color};
  }
`

const MenuBody = styled.div`
  padding-top: 50px;
  overflow: auto;
  margin-bottom: 100px;
`
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.color};
  ${(props) => {
    if (props.me === props.curr) {
      return css`
        color: ${props.theme.ThemeColor};
      `;
    }
  }}
  img {
    width: 46px;
    margin-right: 10px;
  }
  padding: 10px;
  transition: all .1s;
  margin-left: 0;
  &:hover {
    margin-left: 10px;
  }
  svg {
    display: ${props => props.stat ? 'block' : 'none'};
    color: ${props => props.theme.color};
    /* ${(props) => {
      if (props.stat) {
        return css`
          color: ${props.theme.ThemeColor};
        `;
      }
    }} */
  }
`


const RozorBack = styled.div`
  width: 100%;
  padding: 0 RozorBakc0px;
  display: flex;
  & > div:nth-child(1) {
    padding: 20px 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`
const RozorItem = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  font-family: 'sofiapro';
  font-size: 8px;
  color: ${props => props.theme.color};
  text-align: center;
  width: 40%;
  height: auto;
  padding: 20px;
  border: ${props => props.theme.SwapBorder};
  svg {
    fill: ${props => props.theme.color}
  }
  div {
    width: 100%;
    display: inline-block;
    background-color: red;
  }
  span {
    display: ${props => props.flag ? 'flex' : 'none'};
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
      fill: ${props => props.theme.ThemeColor};
    }
  }
`
const SBsCheck = styled(BsCheck)`
  svg {
    /* fill: ${props => props.theme.ThemeColor} */
  }
  margin-left: 20px;
`

const TextOptionDiv = styled.div`
  width: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const TextOption = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme.SwapBorder};
  color: ${props => props.theme.color};
  font-size: 10px;
  position: relative;
  padding: 30px 10px;
  font-family: 'Rajdhani-Light';
  cursor: pointer;
  & :nth-child(1) {
    /* width: 50px;
    height: 50px; */
    margin-bottom: 20px;
  }
  & svg:nth-child(3) {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${props => props.theme.ThemeColor};
    width: 20px;
    height: 20px;
    display: ${props => props.stat ? 'black' : 'none'}
  }
`

const AddToCartDiv = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  button {
    color: #EEE;
    padding: 20px;
    background-color: ${props => props.theme.ThemeColor};
    border-radius: 30px;
    border: 0;
    font-family: 'Rajdhani-Bold';
    font-size: 25px;
    width: 60%;
    transition:all 0.1s;
    &:hover {
      transform: scale(1.1);
    }
  }
`

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  & span:nth-child(1) {
    font-size: 14px;
    font-family: 'sofiapro';
    color: #999999;
  }
  & span:nth-child(2) {
    font-size: 25px;
    font-family: 'Rajdhani-Bold';
    font-size: 20px;
    line-height: 30px;
    color: ${props => props.theme.ThemeColor};
  }
`

const Info = styled.div`
  text-align: right;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 80%;
  & > div:nth-child(1) {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    & > span:nth-child(1) {
      font-size: 13px;
      font-family: 'sofiapro';
      color: #999999
    }
    border-left: 1px solid lightgrey;
  }
`

const EDD = styled.span`
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: black;
  font-family: 'Rajdhani-Bold';
`

const ATC = styled.button`
  padding: 0 40px;
  @media screen and (max-width: 1340px) {
    padding: 0 30px;
  }
  @media screen and (max-width: 1165px) {
    padding: 0 10px;
  }
  @media screen and (max-width: 800px) {
    padding: 0 40px;
  }
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
  /* display: ${props => props.flag ? 'flex' : 'none'}; */
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  color: white;
  border: 0;
  border-radius: 20px;
  background-color: ${props => props.theme.ThemeColor};
  border: 0.5px solid #00D578;
  box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);
  border-radius: 6px;
  img {
    content: url(${props => props.theme.AtcIcon});
  }
  transition: all 0.1s;
  &:hover {
    transform: scale(1.1);
  }
`


const LocalFooter = styled.div`
	& > div:nth-child(1) {
		width: 100%;
		z-index: 600;
		border-top: 1px solid #808080;
    background-color: #1E2025;
		p {
			width: 90%;
			text-align: left;
			padding: 0px 10px;
			color: ${props => props.theme.color};
			font-family: 'Rajdhani-Medium';
			font-size: 16px;
			span {
				font-family: 'Rajdhani-Light';
				font-size: 16x;
			}
	
			@media screen and (max-width: 800px) {
				text-align: center;
			}
		}
		@media screen and (max-width: 800px){
			/* bottom: 20px; */
		}
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		flex-direction: column;
		#info_div {
			width: 90%;
			border-radius: 6px;
			border: 1px solid #00CE71;
			padding: 5px 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: white;
			margin-bottom: 10px;
      box-shadow: 1px 1px 18px 1px ${props => props.theme.ThemeColor};
		}
	}
`

const EsportsWrapper = styled.div`
  
`

const EsportsContainer = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.ScrollTraker};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${props => props.theme.ScrollBar};
  }
  @media screen and (max-width: 800px) {
    height: 55%;
  }
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  & > div:nth-child(2) {
    padding: 20px 20px;
    color: ${props => props.theme.color};
  }
  gap: 4%;
`

const EsportItems = styled.div`
  width: 26%;
  font-family: 'sofiapro';
  color: ${props => props.theme.color};
  position: relative;
  font-size: 15px;
  padding: 10px;
  border: ${props => props.theme.SwapBorder};
  text-align: center;
  cursor: pointer;
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    height: 50px;
    svg {
      width: 80%;
      height: 80%;
      fill: white;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  & > div:nth-child(2) {
    text-align: center;
    margin: 1 0px 0;
    white-space: nowrap;
    color: ${props => props.flag ? props.theme.ThemeColor : props.theme.color};
    font-family: 'Rajdhani-Regular';
    font-size: 19px;
  }

  & > div:nth-child(3) {
    position: absolute;
    top: 5px;
    right: 5px;
    display: ${props => props.flag ? 'block':'none'};
    svg {
      fill: ${props => props.theme.ThemeColor};
    }
  }
`

const CusSwitch = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${props => props.flag ? props.theme.ThemeColor : '#aaa'};
  border-radius: 20px;
  position: relative;
  div {
    position: absolute;
    background-color: white;
    display: inline-block;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 20px;
    transition: all .5s;
    top: 0;
    ${props => props.flag ? 'right' : 'left'}: 1px;
  }
`

const RemapDiv = styled.div`
  border: 1px solid ${props => props.theme.ThemeColor};
  padding: 0 20px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'sofiapro';
  font-size: 17px;
  font-weight: lighter;
`

const MarkDiv = styled.div`
  img {
    content: url(${MarkImg});
    vertical-align: middle;
    display: inline-block;
  }
  &:hover {
    img {
      content: url(${MarkHoverImg});
    }
  }
  border-radius: 100%;
`

const UnderlinedDiv = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.color};
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`

const MobileSelector = styled.select`
  border: 1px solid ${props => props.theme.ThemeColor};
  box-shadow: 2px 2px 10px 1px ${props => props.theme.ThemeColor};
  font-family: 'sofiapro';
  color: ${props => props.theme.ThemeColor};
  background-color: transparent;
  display: none;
  option {
    background-color: ${props => props.theme.ToolBgColor};
  }

  @media screen and (max-width: 800px) {
    display: block;
  }
`

export default Tools;

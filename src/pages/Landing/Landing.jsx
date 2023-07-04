import style from "./Landing.module.css"
import data from "../../assets/Card-Flip.json"
import { useEffect, useState } from "react"


let i = 0, tempScore = 0;
export const Landing = () => {
    const [toggleClass, setToggleClass] = useState([]);
    const [flipImg, setFlipImg] = useState({});
    const [hideContent, setHideContent] = useState({});
    const [showImg, setShowImg] = useState({});
    const [tempState, setTempState] = useState([]);
    const [timer, setTimer] = useState(60);
    const [clickedImg, setClickedImg] = useState({ item: "", id: "" });
    const [heading, setHeading] = useState("Remember the cards");
    const [score, setScore] = useState(0);
    const [gridItems, setGridItems] = useState([...data["Card-Flip"][i].imageSet, ...data["Card-Flip"][i].imageSet]);

    const flipAllCards = () => {
        setFlipImg({
            transform: "rotateY(180deg)",
            transition: "transform 0.5s linear",
        })
        setHideContent({
            transform: "rotateY(0deg)",
            transition: "transform 0.5s linear",
        })
        setHeading("Match the Pairs");
    }

    const checkCard = (idx, item) => {
        if (toggleClass.length > 1) {
            setToggleClass([]);
            setClickedImg({ item: "", id: "" })
        } else {
            setToggleClass(p => [...p, idx]);
        }

        if (clickedImg.item === "") {
            setClickedImg({ item, id: idx });
        } else {
            if (clickedImg.id !== idx) {
                if (clickedImg.item === item) {
                    setShowImg({
                        transform: "rotateY(0deg)",
                    })
                    setTempState(p => [...p, item]);
                    setClickedImg({ item: "", id: "" });
                    setToggleClass([])
                } else {
                    setClickedImg({ item: "", id: "" })
                    setTimeout(() => setToggleClass([]), 700);
                }
            }
        }
    }

    useEffect(() => {
        const shuffleItems = [...gridItems]
        shuffleItems.map((_, idx) => {
            const j = Math.floor(Math.random() * (idx + 1));
            [shuffleItems[idx], shuffleItems[j]] = [shuffleItems[j], shuffleItems[idx]];
        })
        setGridItems(shuffleItems);
    }, [i])

    useEffect(() => {
        tempScore = tempScore + tempState.length;
        if (tempState.length === data["Card-Flip"][i].imageSet.length) {
            if (i < 1) {
                ++i;
                setTempState([]);
                setGridItems([...data["Card-Flip"][i].imageSet, ...data["Card-Flip"][i].imageSet])
                setFlipImg({});
                setHideContent({});
                setHeading("Remember the cards")
            }
            else {
                setHeading("Congratulations on completing the game!!")
            }
        }
    }, [tempState, i])

    useEffect(() => {
        const myTimer = setTimeout(() => {
            setTimer(p => p - 1);
        }, 1000)

        if (timer === 0) {
            clearTimeout(myTimer)
            setScore(tempScore * 1.5)
        }

        if (tempState.length === data["Card-Flip"][i].imageSet.length) {
            clearTimeout(myTimer)
            setScore((timer + tempScore) * 1.5)
        }

    }, [timer])

    return (
        <div className={style["landing-container"]}>
            {timer === 0 || tempState.length === data["Card-Flip"][i].imageSet.length ? <h1>Your score is {score}</h1> :
                <>
                    <div className={style.gameHeader}><h1 className={style["remember-the-cards"]}>{heading}</h1><h2 style={{ position: "absolute", right: "6rem", color: "blue" }}>{timer}</h2></div>
                    <div className={style["game-container"]} onClick={flipAllCards}>
                        {gridItems.map((item, idx) => (
                            <div className={style.cardContainer} key={idx}>
                                <img
                                    className={style.cardImg}
                                    style={idx === toggleClass.find(i => i === idx) ? { ...flipImg, transform: "rotateY(0deg)" } : tempState.find(i => i === item.id) ? { ...flipImg, transform: "rotateY(0deg)" } : { ...flipImg, showImg }}
                                    src={new URL(`../../assets/${item.imgSrc}`, import.meta.url).href}
                                    alt={item.imgSrc}
                                />
                                <div
                                    onClick={() => checkCard(idx, item.id)}
                                    className={style.hideContent}
                                    style={idx === toggleClass.find(i => i === idx) ? { ...hideContent, transform: "rotateY(180deg)" } : tempState.find(i => i === item.id) ? { ...hideContent, transform: "rotateY(180deg)" } : hideContent}
                                ></div>
                            </div>
                        ))}
                    </div>
                </>}
        </div>
    )
}

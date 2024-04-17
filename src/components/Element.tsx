import { Winner } from "../App";


interface Props {
    info: string | null
    changeValue: (c_index: number, r_index: number) => void;
    c_index: number
    r_index: number
    style: Winner |null
}
export default function Element({ info, changeValue, c_index, r_index, style }: Props) {
    const getStyle = () => {
        if (style != null) {
            if (style.orientation == "row") {
                if (r_index == style.position) {
                    return true;
                }
            }
            else if (style.orientation == "col") {
                if (c_index == style.position) {
                    return true;
                }
            }
            else if (style.orientation == "d1") {
                if (r_index == c_index) {
                    return true;
                }
            }
            else if (style.orientation == "d2") {
                if (r_index == 0 && c_index == 2 || r_index == 1 && c_index == 1 || r_index == 2 && c_index == 0) {
                    return true;
                }
            }
        }
        return false;
    }

    const onHandleClick = () => {
        changeValue(c_index, r_index);
    }
    return (
        <div className='element' onClick={onHandleClick} style={{ "backgroundColor": getStyle() ? "green" : "black" }}> {info} </div>
    )

}
import axios from "axios";
import { useEffect, useState } from "react";
import CardContainer from "../components/WordList/CardContainner";

function WordList() {
    const [data, setData] = useState<Array<any>>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8888/api/get/words");
            const fetchedData = response.data.data;
            if (Array.isArray(fetchedData)) {
                setData(fetchedData);
            } else {
                console.error("Fetched data is not an array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <CardContainer data={data} />
        </div>
    );
}

export default WordList;

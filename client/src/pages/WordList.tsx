import axios from "axios";
import { useEffect, useState } from "react";
import CardContainer from "../components/WordList/CardContainner";
import SearchBar from "../components/WordList/SearchBar/SearchBar";

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

    const searchWord = async (word: string) => {
        try {
            const response = await axios.post("http://localhost:8888/api/get/word", { word });
            const result = response.data.data;
            if (result) {
                setData([result]);
            } else {
                console.error("No word found");
            }
        } catch (error) {
            console.error("Error searching for word", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className=" w-full h-screen flex flex-col items-center">
            <SearchBar onSearch={searchWord} />
            <div className="w-full max-w-screen-xl p-6 overflow-y-auto h-full">
                <CardContainer data={data} />
            </div>
        </div>
    );
}

export default WordList;

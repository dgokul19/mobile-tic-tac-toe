import { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableWithoutFeedback } from "react-native";

// Constants
import { PLAYER_NO, GAME_MODE } from "@/constants/Player";

const { PLAYER_1, PLAYER_2 } = PLAYER_NO;
const { PROGRESS, IDLE, COMPLETED } = GAME_MODE;

let winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const GameBoard = () => {

    const [gameMode, setGameMode] = useState(IDLE);
    const [activePlayer, setActivePlayer] = useState(PLAYER_1);
    const [content, setContent] = useState<string[]>([]);
    const [winingPlayer, setWinningPlayer] = useState<string>(null);

    const checkWinningCondition = (updatedContent:any) => {
        for (let matchCondition of winningCondition){
            console.log({matchCondition});

            if(content[matchCondition[0]] && (content[matchCondition[0]] === content[matchCondition[1]]) && (content[matchCondition[0]] === content[matchCondition[2]])){
                setWinningPlayer(content[matchCondition[0]]);
            }
            break;
        }
    };

    const handleGameMode = () => {
        if (gameMode === IDLE) {
            setGameMode(PROGRESS);
        } 
        if (gameMode === PROGRESS) {
            setGameMode(IDLE)
        }
    };

    const handlePressEvent = (boxId: number) => {
        let game:string[] = [...content];
        if (activePlayer === PLAYER_1) {
            setActivePlayer(PLAYER_2);
            game[boxId] = 'X';
        } else {
            setActivePlayer(PLAYER_1);
            game[boxId] = 'O';
        }
        setContent(game);
        checkWinningCondition(game);
    };

    const renderPlayerPress = (boxId: number) => {
        if (gameMode === PROGRESS) {
            return content[boxId]
        }
    };

    const renderViewBoard = useMemo(() => {
        return Array(9).fill('').map((_, index) => {
            return (
                <Pressable
                    key={index}
                    style={style.box}
                    onPress={() => handlePressEvent(index)}>
                        <Text style={style.textContent}>
                            {renderPlayerPress(index)}
                        </Text>
                </Pressable>
            )
        })
    }, [content]);

    return (
        <ScrollView>
            <Pressable style={style.gameButton} onPress={handleGameMode}>
                <Text style={{ color: '#fff' }}>{gameMode === IDLE ? `Start Game` : 'Stop Game'}</Text>
            </Pressable>

            <View style={style.container}>
                {renderViewBoard}
            </View>
            {winingPlayer && <Text> Player {winingPlayer === 'X' ? '1' : '2'} is win</Text>}
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        borderColor: "#fff",
        width: 300,
        height: 300,
        margin: "auto",
        marginTop: 50,
        flexDirection: "row",
        flexWrap : "wrap"
    },
    box: {
        width:98,
        height:100,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#fff",
        borderWidth: 1,
    },
    textContent: {
        color: "#fff"
    },
    gameButton: {
        flex: 1,
        height: 36,
        backgroundColor: "darkblue",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default GameBoard;
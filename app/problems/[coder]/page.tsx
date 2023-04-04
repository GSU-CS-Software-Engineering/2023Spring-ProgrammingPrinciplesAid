"use client"
//editor page 
//uses pages/api/coderAPI/[problem].ts for problem list
import "./(styles)/codeStyle.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {CardResponseType} from "@/common/types/CardResponseType";
import React from 'react'
import {DragDropContext} from "react-beautiful-dnd";
import {Flex, Heading, Text} from "@chakra-ui/react";
import Column from "@/app/problems/[coder]/(components)/column";
import ModalComponent from '@/app/problems/[coder]/(components)/modal';

import {ChakraProvider} from "@chakra-ui/provider";
import theme from "../theme";

//Loads blocks into array, need to find way to load from server
const initialData = {
    tasks: {
        1: {id: 1, content: "String x = ;"},
        2: {id: 2, content: "Int x = 1;"},
        3: {id: 3, content: "double x = 1.0;"},
        4: {id: 4, content: "public static void Main(String[] args)"},
        5: {id: 5, content: "While()"},
        6: {id: 6, content: "System.out.Print(x);"},
    },
    columns: {
        1: {
            id: 1,
            title: "Code Bank",
            taskIds: [1, 2, 3, 4, 5, 6],
        },
        2: {
            id: 2,
            title: "WorkSpace",
            taskIds: [],
        },

    },
    // Facilitate reordering of the columns
    columnOrder: [1, 2],

};


export default function Page({params}: { params: { coder: number } }) {
    const [problem, setProblem] = useState<CardResponseType>();
    const [state, setState] = useState<any>(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getProblemInfo();
    }, [])

    const getProblemInfo = async () => {
        await axios.get<CardResponseType>(`http://localhost:3000/api/coderApi/${params.coder - 1}`).then((response) => {
            setProblem(response.data);
        })
    }
    const openModal = () => {
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
        setIsModalOpen(false);
      };

    const refresh = () =>{
        window.location.reload();
    }
    /*
    This might be implemented in the future just for testing atm
    const getTasks = () => {
        let newTasks: any = [];
        newTasks.push(state.tasks[1]);
        newTasks.push(state.tasks[2]);
        newTasks.push(state.tasks[3]);
        newTasks.push(state.tasks[4]);

        return newTasks;
    }
    */
    const onDragEnd = (result: any) => {
        const {destination, source} = result;

        // If user tries to drop in an unknown destination
        if (!destination) return;

        // if the user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // If the user drops within the same column but in a different positoin
        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            );

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setState(newState);
            return;
        }

        // If the user moves from one column to another
        const startTaskIds = Array.from(sourceCol.taskIds);
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        };

        const endTaskIds = Array.from(destinationCol.taskIds);
        endTaskIds.splice(destination.index, 0, removed);
        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };

        setState(newState);
    };

    const reorderColumnList = (sourceCol: any, startIndex: number, endIndex: number) => {
        const newTaskIds: number[] = Array.from(sourceCol.taskIds);
        const [removed] = newTaskIds.splice(startIndex, 1);
        newTaskIds.splice(endIndex, 0, removed);

        const newColumn = {
            ...sourceCol,
            taskIds: newTaskIds,
        };

        return newColumn;
    };

    //html code
    return (
    <ChakraProvider theme={theme}>

        <DragDropContext onDragEnd={onDragEnd}>
            <Flex
                flexDir="column"
                bg="main-bg"
                minH="100vh"
                w="full"
                color="white-text"
                pb="2rem"
            >
           
            <Flex py="4rem" flexDir="column" align="center">
                <Heading fontSize="3xl" fontWeight={600}>
                    {problem?.number}.{problem?.name}
                <br></br>
                
                </Heading>

                <Text fontSize="20px" fontWeight={600} color="subtle-text">
            
                {problem?.prompt} 
                </Text>
                <a href="/problems"> Click Here To Go To the Problem Page</a>
                </Flex>

                <Flex justify="space-between" px="15rem">
                {state.columnOrder.map((columnId: number) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map((taskId: number) => state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
                </Flex>
            </Flex>
            <div className="container6">
                <div className ="button1">
                    <button onClick={openModal}><p className="subtle">Run</p></button>
                    <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
                        <div className="modalHeader"><h2>Output:</h2></div>

                        <div className = "modalTextAnswer"><p>Incorrect output != {problem?.answer}</p></div>
                        <div className = 'modalTextEscape'><button onClick={closeModal}>Return to Editor</button></div>
                    
                    </ModalComponent>
                </div>
                <div className ="button2">

           
                <button onClick={refresh}><p className = "subtle">Refresh</p></button>

                </div>
            </div>
        </DragDropContext>
    
    </ChakraProvider>

);
            
}

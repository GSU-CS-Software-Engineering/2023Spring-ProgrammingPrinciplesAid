import { Flex, Text} from "@chakra-ui/react";
import React from "react";
import ColumnType from "@/common/types/ColumnType";
import TaskType from "@/common/types/TaskType";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Input } from '@chakra-ui/react'


interface PropsType {
    column: ColumnType,
    tasks: TaskType[],
}

const Column = (props: PropsType) => {
    return (
        <Flex rounded="3px" bg="column-bg" w="600px" h="620px" flexDir="column">
            <Flex
                align="center"
                h="60px"
                bg="column-header-bg"
                rounded="3px 3px 0 0"
                px="1.5rem"
                mb="1.5rem"
            >
                <Text fontSize="17px" fontWeight={600} color="subtle-text">
                    {props.column.title}
                </Text>
            </Flex>

            <Droppable droppableId={"fuck you"}>
                {(droppableProvided: any, droppableSnapshot: any) => (
                    <Flex
                        px="1.5rem"
                        flex={1}
                        flexDir="column"
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {props.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                {(draggableProvided: any, draggableSnapshot: any) => (
                                    <Flex
                                        mb="1rem"
                                        h="72px"
                                        bg="card-bg"
                                        rounded="3px"
                                        p="1.5rem"
                                        outline="2px solid"
                                        outlineColor={
                                            draggableSnapshot.isDragging
                                                ? "card-border"
                                                : "transparent"
                                        }
                                        boxShadow={
                                            draggableSnapshot.isDragging
                                                ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                                                : "unset"
                                        }
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <Text>{task.content}</Text>
                                    </Flex>
                                )}
                            </Draggable>
                        ))}
                    </Flex>
                )}
            </Droppable>
        </Flex>
    );
};

export default Column;
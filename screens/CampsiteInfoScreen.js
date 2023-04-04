import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Button, Modal } from "react-native";
import { useState } from "react";
import { Input, Rating } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const [rating, setRating] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleRatingChange = (rating) => {
        setRating(rating);
    };

    const handleAuthorChange = (author) => {
        setAuthor(author);
    };

    const handleCommentChange = (comment) => {
        setComment(comment);
    };

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text: comment,
            date: new Date().toISOString(),
            campsiteId: campsite.id,
        };
        dispatch(postComment(newComment));
        console.log("comment:", newComment);
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor("");
        setComment("");
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20,
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={setRating}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={setAuthor}
                        value={author}
                    />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle
                        onChangeText={setComment}
                        value={comment}
                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            title="Submit"
                            onPress={() => {
                                handleSubmit();
                                resetForm()
                                }}
                            color='#5637DD'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color="#808080"
                            title="Cancel"
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: "center",
        backgroundColor: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        color: "#43484D",
        padding: 10,
        paddingTop: 30,
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    modal: {
        justifyContent: "center",
        margin: 20,
    },
});

export default CampsiteInfoScreen;

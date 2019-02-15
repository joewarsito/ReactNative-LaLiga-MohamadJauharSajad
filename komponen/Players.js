import React, { Component } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Footer, Content, Icon, Button, Item, Input, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listPlayers: "",
            isLoading: false,
            idTeam: this.props.navigation.getParam("idTeam")
        }
    }


    // styling header
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("teamName"),
            headerStyle: {
                backgroundColor: "purple"
            },
            headerTintColor: "white"
        }
    }

    // load data pemain di tim yg di klik
    componentDidMount() {

        this.setState({
            isLoading: true
        });


        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.state.idTeam}`).then((x) => {
            this.setState({
                listPlayers: x.data.player,
                isLoading: false
            });
        });
    }

    displayPlayers() {
        return this.state.listPlayers.map((val, i) => {
            var idPlayer = val.idPlayer;
            var playerName = val.strPlayer;
            var playerPhoto = val.strThumb;
            var playerPosition = val.strPosition;
            var playerDesc = val.strDescriptionEN;
            var playerNationality = val.strNationality;

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("PlayerDetails", {
                        idPlayer: idPlayer,
                        playerName: playerName,
                        playerDesc: playerDesc,
                        playerNationality: playerNationality,
                        playerPhoto: playerPhoto
                        // disini dikasih semua data yg diperlukan utk ditampilkan di halaman PlayerDetails,
                        //  idPlayer juga bisa digunakan jika memakai cara API get Player Details by ID di halaman PlayerDetails
                    })
                }}>
                    <Left>
                        <Thumbnail square source={{ uri: playerPhoto }} />
                    </Left>
                    <Body>
                        <Text>{playerName}</Text>
                        <Text note>{playerPosition}</Text>
                    </Body>
                    {/* <Right>
                    </Right> */}
                </ListItem>
            )
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <List>
                        {this.state.isLoading ? <Spinner /> : this.state.listPlayers ? this.displayPlayers() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default Players;
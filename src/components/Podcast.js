import React, { Component } from 'react'
import { Button, Badge, Card, CardTitle, Row, Col, } from 'react-materialize'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import PodcastBrowser from './PodcastBrowser';
import PodcastEpisodeBrowser from './PodcastEpisodeBrowser';

class Podcast extends Component{
    constructor(){
        super()

        this.state = {page: 1}
    }
    loadOlderEpisodes = () => {
        this.setState({page: this.state.page + 1})
    }
    loadNewerEpisodes = () => {
        this.setState({page: this.state.page - 1})
    }

    render(){
        console.log('in podcast render',this.props)
        if(this.props.data.loading) return <div/>
        const { id,
                title, 
                description, 
                image_URL, 
                episodes,
                website} = this.props.data.podcast
        return  <div>
                <Row>
                    <Col s={2}></Col>
                    <Col s={8}>
                        <Card
                            className="small"
                            header={<CardTitle 
                            image={image_URL}
                            waves='light'>
                            <a href={website}>{title}</a>
                            </CardTitle>}
                             actions={[<a href={website}>LEARN MORE</a>]}>
                            {description}
                        </Card>
                    </Col>
                    <Col s={2}></Col>
                </Row>
                <Row>
                    <Col s={2}></Col>
                    <Col s={8}>    
                        <Card className="one-pod-card">
                            <PodcastEpisodeBrowser  episodeId={ id } 
                                                    page={ this.state.page }
                                                    episodes={ episodes } />
                            <Button onClick={this.loadOlderEpisodes}> OLDER </Button>
                            {this.state.page > 1 && <Button onClick={this.loadNewerEpisodes}> NEWER</Button>}
                            <Badge> {this.state.page} </Badge>
                        </Card>
                    </Col>
                    <Col s={2}></Col>
                </Row>
                </div>
    }
}

export default graphql(PodcastQuery, {
     options: (props) => { return { variables: {id:  props.match.params.id, page: 1 }, } }
})(Podcast)


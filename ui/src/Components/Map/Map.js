import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { feature } from "topojson-client"
import { geoMercator, geoPath } from "d3-geo";
import queue from 'd3-queue';
import SideBar from '../SideBar/SideBar';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 8,
  },
})

class Map extends Component {
  state = {
    worldData: [],
  }

  componentDidMount() {    
    fetch("/br-states")
    .then(response => {
      console.log(response)
      if (response.status !== 200) {
        return
      }
      response.json().then(worldData => {
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features,
        })
      })
    })
  }

  projection = () => {
    return geoMercator()
      .scale(100)
      .translate([ 800/2, 450/2 ])
  }

  render() {
    const { classes } = this.props;
    const { worldData } = this.state
    return (
      <div>
        <SideBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <svg width={800} height={450} viewBox="0 0 800 450">
            <g className="countries">
              {
                worldData.map((d,i) => (
                  <path
                    key={`path-${ i }`}
                    d={geoPath().projection(this.projection())(d)}
                    className="country"
                    fill={`rgba(38,50,56,${1 / worldData.length * i})`}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                  />
                ))
              }
            </g>
            <g className="markers">
              <circle
                cx={this.projection()([8,48])[0]}
                cy={this.projection()([8,48])[1]}
                r={10}
                fill="#E91E63"
                className="marker"
              />
            </g>
          </svg>
        </main>
      </div>
    );
  }
  
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Map);
 
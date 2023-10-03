import PropTypes from 'prop-types';
import { useStyles } from "./emptyBlockStyles";

export const EmptyBlock = ({  ...props }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.emptyBlock}>
        <p>{props.emptyText1}</p>
        <p>{props.emptyText2}</p>
      </div>
    );
};

EmptyBlock.propTypes = {
    emptyText1: PropTypes.string.isRequired,
    emptyText2: PropTypes.string.isRequired
};
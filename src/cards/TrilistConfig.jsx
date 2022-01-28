import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    TextField, FormControl, Typography, Button, Switch, Card, CardHeader, CardContent,
    IconButton, Tooltip, Grid, TextLink, FormControlLabel, ConfirmationDialog
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Icon } from '@ellucian/ds-icons/lib';
import v4 from 'uuid';

const styles = () => ({
    container: {
        gridGap: '2rem',
        gridTemplateColumns: '1fr 1fr'
    },
    style: {
        // marginLeft: '5%'
        textAlign: 'center',
        img: {
            width: '59%'
        },
        form: {
            marginTop: '1rem',
            marginBottom: '0.3rem',
            display: 'block'
        }
    }
});

const TrilistConfig = props => {
    const {
        classes,
        cardControl: {
            setCustomConfiguration,
            setIsCustomConfigurationValid
        },
        cardInfo: {
            configuration: {
                customConfiguration
            }
        }
    } = props;

    const client = customConfiguration ? customConfiguration.client : undefined;
    const [id, setId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [descr, setDescr] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [linkName, setLinkName] = useState("");
    const [list, setList] = useState(client ? client.list : []);
    const [mode, setMode] = useState('add');
    const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);

    useEffect(() => {
        console.log('useEffect called... ');
        setIsCustomConfigurationValid(isValid());
        setCustomConfiguration({
            customConfiguration: {
                client: {
                    list: list
                }
            }
        });
        console.log(list);
        return () => {
            console.log(customConfiguration);
            setIsCustomConfigurationValid(isValid());
            setCustomConfiguration({
                customConfiguration: {
                    client: {
                        list: list
                    }
                }
            });
        }
    }, [list]);

    const customId = 'DeleteDialog';

    const handleImageChange = (e, v) => {
        setImageUrl(v);
    };

    const handleDescrChange = (e, v) => {
        setDescr(v);
    };

    const handleLinkChange = (e, v) => {
        setLinkUrl(v);
    };

    const handleLinkNameChange = (e, v) => {
        setLinkName(v);
    };

    const handleToggleDeleteDialog = (e) => {
        e.preventDefault();
        setToggleDeleteDialog(true);
    }

    const handleCloseDialogs = () => {
        setToggleDeleteDialog(false);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const tlist = [...list];

        // console.log(tlist);

        tlist.push({
            id: v4(),
            imageUrl: imageUrl,
            linkUrl: linkUrl,
            linkName: linkName,
            descr: descr,
            enabled: true
        });

        setList(tlist);

        setImageUrl("");
        setDescr("");
        setLinkName("");
        setLinkUrl("");
    }

    const isValid = () => {
        return true;
    }

    const handleToggleEdit = (e, id, imageUrl, descr, linkName, linkUrl) => {
        e.preventDefault();
        console.log(imageUrl);
        setMode('edit');
        setId(id);
        setImageUrl(imageUrl);
        setDescr(descr);
        setLinkName(linkName);
        setLinkUrl(linkUrl);
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const index = list.findIndex(element => element.id === id);
        const tlist = [...list];
        tlist[index].imageUrl = imageUrl;
        tlist[index].descr = descr;
        tlist[index].linkName = linkName;
        tlist[index].linkUrl = linkUrl;

        setList(tlist);

        console.log(tlist);

        setMode('add');
        setId(v4());
        setImageUrl("");
        setDescr("");
        setLinkName("");
        setLinkUrl("");
    }

    const handleEnabledChanged = (e, id) => {
        e.preventDefault();
        console.log(id);
        const index = list.findIndex(element => element.id === id);
        const tlist = [...list];

        tlist[index].enabled = !tlist[index].enabled;

        setList(tlist);

    }

    const handleDeleteListItem = (e, id) => {
        e.preventDefault();
        const index = list.findIndex(element => element.id === id);
        const tlist = [...list];

        tlist.splice(index, 1);

        setList(tlist);

        setToggleDeleteDialog(false);
    }

    return (
        <div className={classes.container}>
            <pre className={classes.card}>{JSON.stringify(client, undefined, 2)}</pre>
            <Grid container spacing={5} direction="row" justify="center" alignContent="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Card
                        className={classes.card}
                        id="preview_card"
                        padding="standard"
                        responsive="true"
                        legacySpacingMode
                    >
                        <CardHeader
                            title="Tri-List Card Preview"
                            id="preview_card_CardHeader"
                            action={
                                <React.Fragment>
                                    <Tooltip title="Bookmark" enterDelay={1000} enterNextDelay={1000}>
                                        <IconButton color="gray" aria-label="Bookmark">
                                            <Icon name="bookmark" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Action menu button" enterDelay={1000} enterNextDelay={1000}>
                                        <IconButton color="gray" aria-label="Action menu button">
                                            <Icon name="more-vertical" />
                                        </IconButton>
                                    </Tooltip>
                                </React.Fragment>
                            }
                        />
                        <CardContent className={classes.centerContent}>
                            <Grid container direction="row" justify="center" alignContent="center" alignItems="center" spacing="0" >
                                {list.map((li) => (
                                    <><Grid item xs={2}>
                                        <span style={styles.style}><img style={{ width: '59%' }} src={li.imageUrl} alt=""></img></span>
                                    </Grid><Grid item xs={6}>
                                            <p>{li.descr}</p>
                                        </Grid><Grid item xs={3}>
                                            <TextLink
                                                id="textlink-target"
                                                target="_blank"
                                                href={li.linkUrl}
                                            >{li.linkName}</TextLink>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        id={li.id}
                                                        checked={li.enabled}
                                                        onChange={e => handleEnabledChanged(e, li.id)}
                                                        value="checked"
                                                    />
                                                }
                                                label={li.enabled ? 'On' : 'Off'}
                                            />
                                            <IconButton style={{ backgroundColor: '#dc3545', marginRight: '8px' }} onClick={e => handleToggleDeleteDialog(e)} id="DeleteToggle_Button" aria-label="Delete List Item">
                                                <Icon name="trash" />
                                            </IconButton>
                                            <IconButton style={{ marginRight: '8px' }} onClick={e => handleToggleEdit(e, li.id, li.imageUrl, li.descr, li.linkName, li.linkUrl)} id="EditToggle_Button" aria-label="Edit List Item">
                                                <Icon name="edit" />
                                            </IconButton>
                                        </Grid></>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                    <br />
                    <Typography>Complete the below form to {mode} an item.</Typography>
                    <FormControl id="AddDialog_Container" component="fieldset">
                        <TextField name="image-url" style={{
                            marginTop: '1rem',
                            marginBottom: '0.3rem',
                            display: 'block'
                        }} label="Image url" onChange={(event) => handleImageChange(event, event.target.value)} value={imageUrl} />
                        <TextField style={{
                            marginTop: '1rem',
                            marginBottom: '0.3rem',
                            display: 'block'
                        }} multiline name="descr" label="Description" onChange={(event) => handleDescrChange(event, event.target.value)} value={descr} />
                        <TextField style={{
                            marginTop: '1rem',
                            marginBottom: '0.3rem',
                            display: 'block'
                        }} name="link-url" label="Link url" onChange={(event) => handleLinkChange(event, event.target.value)} value={linkUrl} />
                        <TextField style={{
                            marginTop: '1rem',
                            marginBottom: '0.3rem',
                            display: 'block'
                        }} name="link-url-text" label="Link text" onChange={(event) => handleLinkNameChange(event, event.target.value)} value={linkName} />
                    </FormControl>
                    <div>
                        {mode === 'add' &&
                            <Button className={classes.submitButton} onClick={e => handleAdd(e)}>Add List Item</Button>
                        }
                    </div>
                    <div>
                        {mode === 'edit' &&
                            <Button className={classes.submitButton} onClick={e => handleEdit(e)}>Edit List Item</Button>
                        }
                    </div>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>

            <div id={`${customId}_Container`}>
                <div id={`${customId}_Example`}>
                    <ConfirmationDialog
                        contentText="Are you sure you want to delete this list item? You will not be able to undo this action."
                        primaryActionOnClick={e => handleDeleteListItem(e)}
                        primaryActionText="Delete"
                        open={toggleDeleteDialog}
                        secondaryActionOnClick={e => handleCloseDialogs(e)}
                        secondaryActionText="Cancel"
                        title="Delete this list item?"
                        id="dialog_container"
                        PaperProps={{
                            id: 'dialog_paper'
                        }}
                    />
                </div>
            </div>
        </div >
    );
};

TrilistConfig.propTypes = {
    classes: PropTypes.object,
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object
};

export default withStyles(styles)(TrilistConfig);
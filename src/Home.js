import React from "react"

const Home = () => (
    <div>
        <div className="jumbotron">
            <a href="https://smartcash.cc/wallets/">
                <img src="img/smartnodes_splash.png" alt="SmartNodes are here!" />
            </a>
            <h1>
                <a href="https://smartcash.cc/wallets/">SmartNodes are here!</a>
            </h1>
            <h2>
                <div id="countdown" />
            </h2>
        </div>

        <div className="alert alert-info" role="alert">
            Please{" "}
            <a href="https://smartcash.freshdesk.com/support/solutions/articles/35000032541-how-to-upgrade-to-smartcash-wallet-v1-1-0-everyone-must-do-">
                upgrade all your wallets to v1.1.0
            </a>. This version comes with SmartNodes and also includes a important Zerocoin security patch.
        </div>
        <div className="alert alert-success" role="alert">
            2018-01-08:{" "}
            <a href="http://smartnodes.cc/files/SmartCash_SmartNode_Setup_Guide_v1.0.pdf">SmartNode Setup Guide v1.0</a>{" "}
            has been released. Other language versions will be announced as available.<br />
            2018-01-09:{" "}
            <a href="http://smartnodes.cc/files/SmartCash_SmartNode_Setup_Guide_v1.1.pdf">
                SmartNode Setup Guide v1.1
            </a>{" "}
            has been released. Guide is now also available in{" "}
            <a href="http://smartnodes.cc/files/SmartCash_SmartNode_Setup_Guide_v1.1_RUS.pdf">Russian</a> and{" "}
            <a href="http://smartnodes.cc/files/SmartCash_Setup_Guide_v1.1_GER.pdf">German</a>. (Thanks to{" "}
            <a href="https://forum.smartcash.cc/t/smartcash-smartnode-setup-guide/2320">Azuuri</a>)
        </div>

        <div className="box">
            <h2>SmartNode FAQ</h2>
            <h3>What are the requirements to run a SmartNode?</h3>
            <p>
                <ul>
                    <li>10,000 SMART</li>
                    <li>A computer for running a local wallet to start nodes and hold funds</li>
                    <li>A VPS server for remote node running 24hrs/day with the following specs:</li>
                    <ul>
                        <li>1GB RAM (about half used for OS and half for daemon)</li>
                        <li>20GB drive (less than 1GB used for wallet, some for OS, and some for future.)</li>
                        <li>1 Static IPV4 Address per node (IPV4 address that never changes) (No IPV6)</li>
                    </ul>
                </ul>
            </p>
            <h3>How can I speed up the blockchain syncing for my SmartNode?</h3>
            <p>
                Please refer to the <a href="#SmartNode_bootstrap_download">bootstrap download</a> below.
            </p>
            <h3>When will SmartNode rewards payments start?</h3>
            <p>
                SmartNode rewards will be activated on block height 300,000, which will be some time around January
                29th.
            </p>
            <h3>Is there a install script for SmartNodes, yet?</h3>
            <p>
                Yes, there is a{" "}
                <a href="https://github.com/kevinrombach/smartnodeinstaller">SmartNode Installer Script</a>, but it{"'"}s
                still experimental and in development right now, to quote the developer <strong>dustinface</strong>:
                <blockquote>
                    <p>
                        Hey. i started to create a simple install script for the VPS part of the SmartNode installation
                        guide. You can just invoke it with some parameters and it will run through all the steps on the
                        VPS. Its in a early stage and i will update it from time to time (when i have some time left).
                        For the moment it might be better to follow the official guide instead if you not really know
                        what you are doing and you dont have any linux experience. If you have linux experience and you
                        want to contribute to this script in order to help more people to be able to setup smartnodes in
                        a easier way contact me
                    </p>
                </blockquote>
            </p>
            <h3>Where do I get support regarding SmartNodes?</h3>
            <p>
                Please visit <a href="https://discord.gg/BDUh8jr">#smartnodes on Discord</a> or consult our{" "}
                <a href="https://smartcash.freshdesk.com">SmartCash support platform</a>.
            </p>
            Frequently asked questions and answers on SmartNodes compiled from Discord by <strong>nflaw</strong>. Last
            updated: <strong>2018-01-11</strong>.
        </div>

        <div className="row">
            <div className="col-md-6">
                <div className="box">
                    <h3 id="SmartNode_bootstrap_download">SmartCash Blockchain Download</h3>
                    <p>
                        To assist in speeding up the syncing of your SmartNode, you can download a bootstrap of the
                        blockchain here.{" "}
                        <strong>
                            But make sure you set <code>txindex=1</code> in smartcash.conf first.
                        </strong>
                    </p>
                    <p>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <a
                                            className="btn btn-default"
                                            href="http://proteanx.com/txindexstrap.zip"
                                            role="button"
                                        >
                                            Download &raquo;
                                        </a>
                                    </td>
                                    <td>zip</td>
                                    <td>
                                        <a href="http://proteanx.com/txindexstrap.zip">
                                            http://proteanx.com/txindexstrap.zip
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
                    <p>Last Updated: 2018-01-11 00:49:40 UTC</p>
                    <p>
                        This download is kindly provided by{" "}
                        <strong>
                            <a href="https://forum.smartcash.cc/u/proteus">Proteus</a>
                        </strong>
                    </p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="box">
                    <h3>SmartCash Ressources</h3>
                    <p>
                        <a href="https://smartcash.cc">SmartCash Website</a>
                    </p>
                    <p>
                        <a href="https://forum.smartcash.cc">SmartCash Forum</a>
                    </p>
                    <p>
                        <a href="https://discordapp.com/invite/BDUh8jr">SmartCash on Discord</a>
                    </p>
                    <p>
                        <a href="https://www.reddit.com/r/smartcash">SmartCash on Reddit</a>
                    </p>
                    <p>
                        <a href="https://twitter.com/scashofficial">SmartCash on Twitter</a>
                    </p>
                    <p>
                        <a href="https://steemit.com/@smartcash">SmartCash on Steem</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export default Home

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var SceneGraphHelper = require('../utils/scene-graph-helper');

/**
 * The base class for all rendering component in scene graph.
 *
 * You should override:
 * - _createSgNode
 * - _initSgNode
 *
 * @class _SGComponent
 * @extends Component
 * @private
 */
var SGComponent = cc.Class({
    extends: require('./CCComponent'),

    editor: CC_EDITOR && {
        executeInEditMode: true,
        disallowMultiple: true
    },
    
    properties: {
        _sgNode: {
            default: null,
            serializable: false
        }
    },

    onLoad: function () {
        this._initSgNode();
        var sgNode = this._sgNode;
        if ( !this.node._sizeProvider ) {
            this.node._sizeProvider = sgNode;
        }
    },
    onDestroy: function () {
        if ( this.node._sizeProvider === this._sgNode ) {
            this.node._sizeProvider = null;
        }
        this._removeSgNode();
    },

    /**
     * Create and returns your new scene graph node (SGNode) to add to scene graph.
     * You should call the setContentSize of the SGNode if its size should be the same with the node's.
     *
     * @method _createSgNode
     * @return {_ccsg.Node}
     * @private
     */
    _createSgNode: null,

    /**
     * @method _initSgNode
     * @private
     */
    _initSgNode: null,
    
    /**
     * @method _removeSgNode
     * @private
     */
    _removeSgNode: SceneGraphHelper.removeSgNode,
});

cc._SGComponent = module.exports = SGComponent;

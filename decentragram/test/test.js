const { assert } = require('chai');

const Decentragram = artifacts.require('./Decentragram.sol');


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Decentragram',([deployer,author,liker]) => {
    let decentragram

    before(async () => {
        decentragram = await Decentragram.deployed()
    })

    describe('Deployment',async () => {
        // Checks if deployment is successfull
        // and address is real
        it('Deploys Successfully', async () => {
            const address = await decentragram.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
        // Check if application name is found
        it('Application Name',async () => {
            const name = await decentragram.name()
            assert.equal(name,'Decentragram')
        })
    })

    describe('Post', async() => {
        let result, postCount
        const hash = 'abc123'
        // Creating a test post 
        // before running the test
        before(async () => {
            result = await decentragram.uploadPost(
                hash,
                'Image description',
                // Sending metadata of author
                {
                    from:author
                }
            )
            postCount = await decentragram.postCount()
        })


        // Checking if post was uploaded 
        it('Post Creation', async ()=> {
            // Checking if postCount is equal to 1
            assert.equal(postCount,1)
            // Getting data from event as event is created
            const event = result.logs[0].args
            // Checking if post id is correct
            assert.equal(event.id.toNumber(),postCount.toNumber(),"Post Id Correct")
            // Checking if hash is correct
            assert.equal(event.hash,hash,"Hash Correct")
            // Checking if image description is correct
            assert.equal(event.description, "Image description","Description Correct")
            // Checking if likes were set to 0
            assert.equal(event.likes,'0',"Initial Likes Correct")
            // Checking if author was correct
            assert.equal(event.author,author,'Author Correct') 


            // Blank hash post should not be created
            await decentragram.uploadPost(
                '',
                'Image description',
                {
                    from:author
                }
            ).should.be.rejected;

            // Blank image description post should not be created
            await decentragram.uploadPost(
                'Image hash',
                '',
                {
                    from:author
                }
            ).should.be.rejected;

            // Blank from post should not be created
            await decentragram.uploadPost(
                'Image hash',
                'Image description',
                {
                    from:''
                }
            ).should.be.rejected;

        })

        it('Post is listed', async () => {
            const post = await decentragram.posts(postCount)
            // Checking if post id is correct
            assert.equal(post.id.toNumber(),postCount.toNumber(),"Post Id Correct")
            // Checking if hash is correct
            assert.equal(post.hash,hash,"Hash Correct")
            // Checking if image description is correct
            assert.equal(post.description, "Image description","Description Correct")
            // Checking if likes were set to 0
            assert.equal(post.likes,'0',"Initial Likes Correct")
            // Checking if author was correct
            assert.equal(post.author,author,'Author Correct') 
        })

        it('Post can be liked', async () => {
            // Tracking author's balance before post is liked
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            // Liking  a Post
            result = await decentragram.likePost(
                postCount,
                {
                    from: liker,
                    value: web3.utils.toWei('1','Ether')
                }
            )
            
            // Checking if postLiked event is emitted with same data
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(),'ID correct')
            assert.equal(event.hash, hash,'Hash correct')
            assert.equal(event.description,'Image description','Description correct')
            assert.equal(event.likes,1,'Likes correct')
            assert.equal(event.author,author,'Author correct')

            // Checking that author received the funds
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('1','Ether')
            tipAmount = new web3.utils.BN(tipAmount)

            const expectedBalance = oldAuthorBalance.add(tipAmount)
            
            assert.equal(newAuthorBalance.toString(),expectedBalance.toString())

            // Liking not allowed on non existing posts
            await decentragram.likePost(
                99,
                {
                    from: liker,
                    value: web3.utils.toWei('1','Ether')
                }
            ).should.be.rejected;
        })

    })
})
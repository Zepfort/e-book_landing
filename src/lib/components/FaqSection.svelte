<script>
    import FaqItem from "./FaqItem.svelte";
    import Button from "./Button.svelte";
    import TwitterIcon from "/src/assets/icons/twitter.webp"

    

    const faqs = [
  {
    question: "What will I learn from this ebook?",
    answer:
      "This ebook provides a comprehensive guide to relocating to Spain, covering everything from securing the right visa and navigating Spain's legal system to finding the perfect place to live and integrating into the local culture. Whether you're moving for work, study, or retirement, this guide equips you with the essential knowledge and practical steps to make your transition as smooth as possible.",
  },
  {
    question: "Who is this ebook for?",
    answer:
      "This ebook is perfect for anyone considering a move to Spain, whether you're planning a short-term stay or a permanent relocation. It's designed for expats, retirees, students, and professionals who want to avoid common pitfalls and streamline their move. If you're looking for a detailed, step-by-step guide to help you every step of the way, this ebook is for you.",
  },
  {
    question: "How much does the ebook cost?",
    answer:
      "The ebook is priced at $10. This one-time purchase grants you immediate access to all the content, including detailed chapters, actionable checklists, and valuable resources that will save you time, money, and stress during your move to Spain.",
  },
  {
    question: "Is the information in the ebook up-to-date?",
    answer:
      "Yes, the ebook is regularly updated to reflect the latest changes in Spanish immigration laws, visa requirements, and other relevant information. The author, John Smith, stays on top of these updates to ensure that you're receiving the most accurate and current guidance available.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Absolutely. We offer a 30-day money-back guarantee. If you feel that the ebook did not meet your expectations or didn't provide the value you were looking for, simply contact us within 30 days of your purchase, and we’ll issue a full refund—no questions asked.",
  },
    ];

    let questionCurrentlyExpended = $state(-1);

    function onclick(index) {
        if(questionCurrentlyExpended === index){
            questionCurrentlyExpended = -1;
        } else {
            questionCurrentlyExpended = index;
        }
    }
</script>
<section class="mr-[12vw] ml-[12vw] min-h-[1080px] max-w-[1520px] px-0 pt-[80px]">
    <h2 class="text-6xl font-bold mb-8">Frequently asked questions</h2>
    <div class="container flex flex-col justify-center pb-8">
        {#each faqs as faq, index}
            
        <FaqItem {faq} isExpended={index === questionCurrentlyExpended} 
            onclick={()=> onclick(index)}/>
        {/each}
    </div>
    <div class="flex flex-col justify-end items-center">
        <Button>BUY NOW</Button>
        <p>Any other questions?</p>
        <p class="flex flex-rom">
            Hit me up on twitter <img src={TwitterIcon} alt="Twitter" class="max-w-[20px]"/>
        </p>
    </div>
</section>